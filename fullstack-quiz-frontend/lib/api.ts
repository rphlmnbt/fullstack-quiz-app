const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://quiz-api.rphlmnbt.workers.dev';

export async function fetchQuiz() {
  const res = await fetch(`${BACKEND_URL}/api/quiz`);
  if (!res.ok) throw new Error('Failed to fetch quiz');
  return res.json();
}

export async function postGrade(answers: any) {
  const res = await fetch(`${BACKEND_URL}/api/grade`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error('Failed to grade quiz');
  return res.json();
}
