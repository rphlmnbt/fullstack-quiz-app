"use client";
import { useEffect, useState } from "react";
import { fetchQuiz, postGrade } from "../lib/api";
import { QuizData, Question, Answer } from "../types/quiz";

export default function Quiz() {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetchQuiz()
      .then(setQuiz)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!quiz) return null;

  const handleChange = (id: string | number, value: any) => {
    setAnswers(prev => {
      const idx = prev.findIndex(a => a.id === id);
      if (idx === -1) return [...prev, { id, value }];
      const copy = [...prev];
      copy[idx].value = value;
      return copy;
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await postGrade(answers);
      setResult(res);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (result) {
    return (
      <div className="p-5 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">Result</h2>
        <p>
          Score: {result.score} / {result.total}
        </p>
        <ul className="mt-4 space-y-2">
          {result.results.map((r: any) => (
            <li key={r.id} className={r.correct ? "text-green-600" : "text-red-600"}>
              Question {r.id}: {r.correct ? "Correct" : "Incorrect"}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Quiz</h2>
      <div className="space-y-4">
        {quiz.questions.map(q => (
          <div key={q.id} className="border p-3 rounded">
            <p className="font-medium">{q.question}</p>
            {q.type === "text" && (
              <input
                type="text"
                className="mt-2 border p-1 w-full rounded"
                onChange={e => handleChange(q.id, e.target.value)}
              />
            )}
            {q.type === "radio" && (
              <div className="mt-2 space-y-1">
                {q.choices.map((choice, idx) => (
                  <label key={idx} className="block">
                    <input
                      type="radio"
                      name={q.id.toString()}
                      value={idx}
                      onChange={() => handleChange(q.id, idx)}
                      className="mr-2"
                    />
                    {choice}
                  </label>
                ))}
              </div>
            )}
            {q.type === "checkbox" && (
              <div className="mt-2 space-y-1">
                {q.choices.map((choice, idx) => (
                  <label key={idx} className="block">
                    <input
                      type="checkbox"
                      value={idx}
                      onChange={e => {
                        const raw = answers.find(a => a.id === q.id)?.value;
                        const prev = Array.isArray(raw) ? raw : [];
                        if (e.target.checked) handleChange(q.id, [...prev, idx]);
                        else handleChange(q.id, prev.filter((v: number) => v !== idx));
                      }}
                      className="mr-2"
                    />
                    {choice}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}