
export interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizData {
  questions: Question[];
}

export type GameState = 'start' | 'loading' | 'playing' | 'finished';

export type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';
