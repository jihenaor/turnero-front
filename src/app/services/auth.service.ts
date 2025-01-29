import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
      name: 'Juan Pérez',
      isAdvisor: true,
      module: 'Module A',
      isAvailable: true,
      services: ['Service A', 'Service B']
    },
    {
      id: 2,
      username: 'advisor2',
      password: '789012',
      role: UserRole.ADVISOR,
      name: 'Ana Martínez',
      isAdvisor: true,
      module: 'Module B',
      isAvailable: false,      
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
      isAvailable: true,
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

  login(username: string, password: string): Observable<UserDTO | null> {
    console.log('Iniciando proceso de login para:', username);
    
    // Agregamos más validaciones y logging
    if (!username || !password) {
      console.error('Username o password vacíos');
      return of(null);
    }

    const user = this.users.find(u => u.username === username && u.password === password);
    
    return of(user).pipe(
      tap((user: User | undefined) => {
        if (user) {
          console.log('Usuario encontrado:', {
            username: user.username,
            role: user.role,
            id: user.id
          });
        } else {
          console.warn('Usuario no encontrado:', username);
        }
      }),
      map((user: User | undefined) => {
        if (!user) {
          console.log('Retornando null por usuario no encontrado');
          return null;
        }

        const userDTO: UserDTO = {
          id: user.id,
          username: user.username,
          role: user.role,
          name: user.name
        };

        try {
          // Primero actualizamos el BehaviorSubject
          this.currentUserSubject.next(userDTO);
          // Luego guardamos en localStorage
          localStorage.setItem('currentUser', JSON.stringify(userDTO));
          console.log('Login exitoso para usuario:', userDTO.role);
          return userDTO;
        } catch (error) {
          console.error('Error en proceso de login:', error);
          this.currentUserSubject.next(null);
          localStorage.removeItem('currentUser');
          throw error;
        }
      }),
      catchError(error => {
        console.error('Error crítico en proceso de login:', error);
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        return of(null);
      })
    );
  }

  logout(): void {
    // Limpiar localStorage
    localStorage.removeItem('currentUser');
    localStorage.clear();
    
    // Limpiar el BehaviorSubject
    this.currentUserSubject.next(null);
    
    // Navegar al login
    this.router.navigate(['/login']);
    
    console.log('Sesión cerrada correctamente');
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
} 