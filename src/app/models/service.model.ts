export interface Service {
  id?: number;
  name: string;
  description: string;
  isActive: boolean;
  estimatedTime: number; // tiempo estimado en minutos
  advisorIds: number[]; // IDs de los asesores que pueden atender este servicio
  createdAt: Date;
  updatedAt?: Date;
} 