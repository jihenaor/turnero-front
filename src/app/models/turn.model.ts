export type TurnStatus = 'WAITING' | 'CALLED' | 'COMPLETED';

export interface Turn {
  id?: number;
  turnNumber?: string;
  module?: string;
  service: string;
  serviceId: number;  // ID del servicio asociado
  userIdentification: string;
  status: TurnStatus;
  date?: Date;  // Fecha del turno (sin hora)
  createdAt: Date;
  createdTimeStr: string;  // Hora de creación en formato HH:mm
  calledAt?: Date;
  calledTimeStr?: string;  // Hora del llamado en formato HH:mm
  completedAt?: Date;
  completedTimeStr?: string;  // Hora de completado en formato HH:mm
  advisorId?: number;
  isPriority?: boolean;
  waitingTime?: number;  // Tiempo en espera en minutos (desde creación hasta llamado)
  attentionTime?: number;  // Tiempo de atención en minutos (desde llamado hasta completado)
  identification?: string;
  accountNumber?: string;
  clientPhone?: string;
  clientMail?: string;
  problem?: string;
  solution?: string;
  comments?: string;
}
