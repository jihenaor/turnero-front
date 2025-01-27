export interface Turn {
  id?: number;
  turnNumber: string;
  turnCode: string;
  module: string;
  service: string;
  userIdentification: string;
  status: 'WAITING' | 'CALLED' | 'COMPLETED' | 'pending';
  createdAt: Date;
  completedAt?: Date;
  calledAt?: Date;
  advisorId?: number;
  isPriority?: boolean;
  priorityDetails?: String | null;
} 