import { Turn } from "./turn.model";

export const UserRole = {
  CLIENT: 'CLIENT' as const,
  ADVISOR: 'ADVISOR' as const,
  COORDINATOR: 'COORDINATOR' as const
} as const;

export const UserStatus = {
  ACTIVE: 'ACTIVE' as const,
  ON_BREAK: 'ON_BREAK' as const,
  INACTIVE: 'INACTIVE' as const
} as const;

// Crear un tipo basado en los valores de UserRole
export type UserRole = typeof UserRole[keyof typeof UserRole];
export type UserStatus = typeof UserStatus[keyof typeof UserStatus];

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
  status?: UserStatus;  // Solo este atributo para el estado
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
  status?: UserStatus;
}
