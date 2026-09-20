// src/types/questionBank.ts
export type QuestionCategory =
  | "Frontend"
  | "Backend"
  | "DSA"
  | "System Design"
  | "Behavioral";

export type QuestionDifficulty = "Easy" | "Medium" | "Hard";

export interface QuestionBankItem {
  _id: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  question: string;
  answer: string;
  tags: string[];
  createdAt: string;
}

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  "Frontend",
  "Backend",
  "DSA",
  "System Design",
  "Behavioral",
];

export const QUESTION_DIFFICULTIES: QuestionDifficulty[] = ["Easy", "Medium", "Hard"];