export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  questions: Question[];
}
