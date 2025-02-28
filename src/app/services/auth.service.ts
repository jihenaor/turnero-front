import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserRole, UserDTO, UserStatus } from '../models/user.model';
import { ROUTES } from '../constants/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserDTO | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  // Simulación de base de datos de usuarios
  private users: User[] = [
    {
      id: 1,
      username: 'advisor1',
      password: '123456',
      role: UserRole.ADVISOR,
      name: 'Juan Pérez',
      isAdvisor: true,
      module: 'Module A',
      status: UserStatus.ACTIVE,
      services: ['Atención al Cliente', 'Pagos']
    },
    {
      id: 2,
      username: 'advisor2',
      password: '789012',
      role: UserRole.ADVISOR,
      name: 'Ana Martínez',
      isAdvisor: true,
      module: 'Module B',
      status: UserStatus.ACTIVE,
      services: ['Service C', 'Service D']
    },
    {
      id: 3,
      username: 'coordinator1',
      password: '123456',
      role: UserRole.COORDINATOR,
      name: 'María Rodríguez',
      redirectTo: '/dashboard'
    },
    {
      id: 4,
      username: 'client1',
      password: '123456',
      role: UserRole.CLIENT,
      name: 'Carlos López',
      redirectTo: '/client-dashboard'
    },
    {
      id: 5,
      username: 'advisor3',
      password: '345678',
      role: UserRole.ADVISOR,
      name: 'Luis Fernández',
      isAdvisor: true,
      module: 'Module C',
      status: UserStatus.ACTIVE,
      services: ['Service A', 'Service C']
    }
  ];


  constructor(private router: Router) {
    // Verificar si hay un usuario en el localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  getCurrentUser(): UserDTO | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      // Crear DTO incluyendo el status
      const userDTO: UserDTO = {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        redirectTo: user.redirectTo,
        services: user.services,
        status: user.status || UserStatus.ACTIVE  // Incluir el status
      };

      localStorage.setItem('currentUser', JSON.stringify(userDTO));
      this.currentUserSubject.next(userDTO);
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate([ROUTES.LOGIN]);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserSubject.value?.role === role;
  }

  getUserName(): string {
    const user = this.currentUserSubject.value;
    return user ? user.name : '';
  }

  getUserServices(): string[] {
    const user = this.currentUserSubject.value;
    return user?.services || [];
  }

  getUserRole(): UserRole {
    const user = this.currentUserSubject.value;
    return user ? user.role : UserRole.CLIENT;
  }

  updateUserStatus(userId: number, newStatus: UserStatus): void {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const updatedUser = {
        ...currentUser,
        status: newStatus
      };

      // Actualizar en localStorage
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Actualizar el BehaviorSubject
      this.currentUserSubject.next(updatedUser);

      // También actualizar en el array de usuarios
      const userIndex = this.users.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        this.users[userIndex] = {
          ...this.users[userIndex],
          status: newStatus
        };
      }

      // Emitir el cambio para que los componentes se actualicen
      this.currentUserSubject.next(updatedUser);
    }
  }
}
