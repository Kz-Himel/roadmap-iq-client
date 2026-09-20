// src/types/interview.ts
export type InterviewType = "Technical" | "Behavioral" | "HR";
export type InterviewDifficulty = "Easy" | "Medium" | "Hard";
export type InterviewStatus = "in-progress" | "completed";

export interface InterviewQA {
  question: string;
  answer?: string;
  feedback?: string;
  score?: number;
  answeredAt?: string;
}

export interface MockInterviewSession {
  _id: string;
  userEmail: string;
  role: string;
  difficulty: InterviewDifficulty;
  type: InterviewType;
  questions: InterviewQA[];
  overallScore?: number;
  overallFeedback?: string;
  status: InterviewStatus;
  createdAt: string;
  completedAt?: string;
}

export const INTERVIEW_TYPES: InterviewType[] = ["Technical", "Behavioral", "HR"];
export const INTERVIEW_DIFFICULTIES: InterviewDifficulty[] = ["Easy", "Medium", "Hard"];
export const TOTAL_INTERVIEW_QUESTIONS = 5;