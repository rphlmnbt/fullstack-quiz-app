export type TextQuestion = {
  id: string | number;
  type: 'text';
  question: string;
  correctText: string;
}

export type RadioQuestion = {
  id: string | number;
  type: 'radio';
  question: string;
  choices: string[];
  correctIndex: number;
}

export type CheckboxQuestion = {
  id: string | number;
  type: 'checkbox';
  question: string;
  choices: string[];
  correctIndexes: number[];
}

export type Question = TextQuestion | RadioQuestion | CheckboxQuestion;

export type QuizData = {
  questions: Question[];
}
