export type TextQuestion = {
  id: string | number;
  type: 'text';
  question: string;
}

export type RadioQuestion = {
  id: string | number;
  type: 'radio';
  question: string;
  choices: string[];
}

export type CheckboxQuestion = {
  id: string | number;
  type: 'checkbox';
  question: string;
  choices: string[];
}

export type Question = TextQuestion | RadioQuestion | CheckboxQuestion;

export type QuizData = {
  questions: Question[];
};

export type Answer = {
  id: string | number;
  value: string | number | number[];
};
