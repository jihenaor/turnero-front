export interface Turn {
  id?: number;
  turnNumber: string;
  turnCode: string;
  module: string;
  service: string;
  userIdentification: string;
  status: 'WAITING' | 'CALLED' | 'COMPLETED';
  date: Date;  // Fecha del turno (sin hora)
  createdAt: Date;
  calledAt?: Date;
  completedAt?: Date;
  advisorId?: number;
  isPriority?: boolean;
  priorityDetails?: string | null;
  waitingTime?: number;
  attentionTime?: number;
} 