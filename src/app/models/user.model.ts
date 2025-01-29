import { Turn } from "./turn.model";

export const UserRole = {
  CLIENT: 'CLIENT' as const,
  ADVISOR: 'ADVISOR' as const,
  COORDINATOR: 'COORDINATOR' as const
} as const;

// Crear un tipo basado en los valores de UserRole
export type UserRole = typeof UserRole[keyof typeof UserRole];


export interface User {
  id: number;
  username: string;
  name: string;
  password?: string;
  role: UserRole;
  redirectTo?: string;
  // Atributos específicos para asesores
  isAdvisor?: boolean;
  module?: string;
  isAvailable?: boolean;
  currentTurn?: Turn;
  nextTurn?: Turn;
  // Servicios que puede atender
  services?: string[];
}

export interface UserDTO {
  id: number;
  username: string;
  role: UserRole;
  name: string;
  redirectTo?: string;
  services?: string[];
} 