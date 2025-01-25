import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User, UserRole, UserDTO } from '../models/user.model';

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
      name: 'Juan Pérez'
    },
    {
      id: 2,
      username: 'coordinator1',
      password: '123456',
      role: UserRole.COORDINATOR,
      name: 'María Rodríguez'
    },
    {
      id: 3,
      username: 'client1',
      password: '123456',
      role: UserRole.CLIENT,
      name: 'Carlos López'
    }
  ];

  constructor() {
    // Verificar si hay un usuario en el localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  getCurrentUser(): UserDTO | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<UserDTO | null> {
    console.log('Intentando login con:', username); // Debug

    return of(this.users.find(u => u.username === username && u.password === password))
      .pipe(
        tap((user: User | undefined) => console.log('Usuario encontrado:', user)), // Debug
        map((user: User | undefined) => {
          if (user) {
            const userDTO: UserDTO = {
              id: user.id,
              username: user.username,
              role: user.role,
              name: user.name
            };
            localStorage.setItem('currentUser', JSON.stringify(userDTO));
            this.currentUserSubject.next(userDTO);
            return userDTO;
          }
          return null;
        }),
        catchError(error => {
          console.error('Error en login:', error);
          return of(null);
        })
      );
  }

  logout(): void {
    // Limpiar localStorage
    localStorage.removeItem('currentUser');
    
    // Limpiar el BehaviorSubject
    this.currentUserSubject.next(null);
    
    // Limpiar cualquier otro dato de sesión si existe
    localStorage.clear(); // Esto limpiará todo el localStorage
    
    console.log('Sesión cerrada correctamente');
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserSubject.value?.role === role;
  }
} 