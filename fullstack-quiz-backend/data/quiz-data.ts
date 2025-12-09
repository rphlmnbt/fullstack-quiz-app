import { QuizData } from '../types/quiz';

const quizData: QuizData = {
  questions: [
    { id: 'q1', type: 'text', question: 'What is the capital of France?', correctText: 'Paris' },
    { id: 'q2', type: 'radio', question: '2 + 2 = ?', choices: ['3','4','5'], correctIndex: 1 },
    { id: 'q3', type: 'checkbox', question: 'Select prime numbers', choices: ['2','3','4','5'], correctIndexes: [0,1,3] },
    { id: 'q4', type: 'radio', question: 'Which is a mammal?', choices: ['Shark','Dolphin','Octopus'], correctIndex: 1 },
    { id: 'q5', type: 'text', question: 'Type the color of the sky (one word)', correctText: 'Blue' },
    { id: 'q6', type: 'radio', question: 'Which month has 28 days?', choices: ['Feb','Dec','Mar'], correctIndex: 0 },
    { id: 'q7', type: 'checkbox', question: 'Select vowels', choices: ['a','b','e','g'], correctIndexes: [0,2] },
    { id: 'q8', type: 'radio', question: 'Which number is even?', choices: ['3','7','8'], correctIndex: 2 }
  ]
};

export default quizData;