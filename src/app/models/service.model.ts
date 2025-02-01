export interface Service {
  id?: number;
  name: string;
  letter: string;  // Letra para generar el código del turno (ej: 'A' para Atención, 'P' para Pagos)
  description: string;
  isActive: boolean;
  schedulable: boolean;  // Nuevo atributo
  estimatedTime: number; // tiempo estimado en minutos
  advisorIds: number[]; // IDs de los asesores que pueden atender este servicio
  createdAt: Date;
  updatedAt?: Date;
  icon: string;  // Path del SVG del icono
}
