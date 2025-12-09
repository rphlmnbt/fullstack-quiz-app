import { Hono } from 'hono';
import quizData from '../data/quiz-data';
import { validateGradePayload } from '../../utils/validate';
import { QuizData } from '../../types/quiz';
import { seededShuffle } from '../../utils/shuffle';

const router = new Hono();

router.get('/quiz', (c) => {
  try {
    const seedParam = c.req.query('seed');
    const seed = seedParam ? Number(seedParam) : undefined;
    let payload: QuizData = JSON.parse(JSON.stringify(quizData));
    if (!isNaN(Number(seed))) {
      payload.questions = seededShuffle(payload.questions, Number(seed));
      payload.questions = payload.questions.map((q, i) => {
        if ((q as any).choices) {
          (q as any).choices = seededShuffle((q as any).choices, Number(seed) + i + 1);
        }
        return q;
      });
    }
    return c.json(payload, 200);
  } catch (err) {
    return c.json({ error: 'Failed to load quiz' }, 500);
  }
});

router.post('/grade', async (c) => {
  const body = await c.req.json().catch(() => null);
  const validated = validateGradePayload(body);
  if (!validated.valid) {
    return c.json({ error: validated.message }, 400);
  }

  const answers = body.answers as { id: string | number, value: any }[];

  let score = 0;
  const results: { id: string | number, correct: boolean }[] = [];

  for (const q of quizData.questions) {
    const user = answers.find(a => String(a.id) === String(q.id));
    let correct = false;

    if (q.type === 'text') {
      const v = String(user?.value ?? '').trim().toLowerCase();
      correct = !!(q.correctText && v === q.correctText.toLowerCase());
    } else if (q.type === 'radio') {
      const v = Number(user?.value);
      correct = q.correctIndex === v;
    } else if (q.type === 'checkbox') {
      const arr = Array.isArray(user?.value) ? user.value.map(Number) : [];
      const expected = (q.correctIndexes || []).map(Number);
      const setA = new Set(arr);
      const setB = new Set(expected);
      if (setA.size === setB.size) {
        correct = [...setA].every(x => setB.has(x));
      } else correct = false;
    }

    if (correct) score++;
    results.push({ id: q.id, correct });
  }

  return c.json({ score, total: quizData.questions.length, results }, 200);
});

export default router;