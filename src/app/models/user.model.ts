export enum UserRole {
  CLIENT = 'CLIENT',
  ADVISOR = 'ADVISOR',
  COORDINATOR = 'COORDINATOR'
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  name: string;
}

export type UserDTO = Omit<User, 'password'>; 