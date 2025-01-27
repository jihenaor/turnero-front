export interface SatisfactionSurvey {
  id?: number;
  turnId: number;
  advisorId: number;
  rating: number;  // 1-5 estrellas
  comment?: string;
  createdAt: Date;
  service: string;
  module: string;
} 