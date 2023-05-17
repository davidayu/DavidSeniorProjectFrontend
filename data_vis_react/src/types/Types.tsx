export type UserAnswer = {
  text_answer: string | null;
  slider_answer: number | null;
  numeric_answer: number | null;
  timestamp: string;
  user: string;
  question: number;
};

export type PathFeedback = {
  id: number;
  rating: number;
  path_id: number;
  user_id: number;
  timestamp: string;
};