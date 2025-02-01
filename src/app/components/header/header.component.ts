import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';
import { User, UserRole, UserStatus } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="flex justify-between items-center px-4 py-3">
        <div class="flex flex-col">
          <div class="flex items-center">
            <span class="text-xl font-semibold text-gray-800 dark:text-white">{{ userName }}</span>
            <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">{{ userRole }}</span>
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            <span class="font-medium">Servicios:</span>
            <span class="ml-1">
              {{ userServices.length > 0 ? userServices.join(' • ') : 'No tiene servicios asignados' }}
            </span>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Botón de estado para asesores -->
          @if (isAdvisor) {
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                <span class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full"
                        [ngClass]="{'bg-green-500': currentUser?.status === UserStatus.ACTIVE, 'bg-yellow-500': currentUser?.status !== UserStatus.ACTIVE}">
                  </span>
                  {{ currentUser?.status === UserStatus.ACTIVE ? 'Disponible' : 'En receso' }}
                </span>
              </span>
              <button
                (click)="toggleStatus()"
                [class]="getStatusButtonClasses()">
                @if (currentUser?.status === UserStatus.ACTIVE) {
                  <svg xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke-width="1.5"
                       stroke="currentColor"
                       class="w-5 h-5 mr-1">
                    <path stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  <span>Pausar</span>
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke-width="1.5"
                       stroke="currentColor"
                       class="w-5 h-5 mr-1">
                    <path stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
                  </svg>
                  <span>Reanudar</span>
                }
              </button>
            </div>
          }

          <!-- Botón de tema -->
          <button (click)="toggleTheme()"
                  class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <!-- Ícono Sol para modo claro -->
            <svg *ngIf="isDarkMode$ | async"
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-6 w-6"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Ícono Luna para modo oscuro -->
            <svg *ngIf="!(isDarkMode$ | async)"
                 xmlns="http://www.w3.org/2000/svg"
                 class="h-6 w-6"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <!-- Botón de logout -->
          <button (click)="logout()"
                  class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  userRole: string = '';
  userServices: string[] = [];
  isDarkMode$: Observable<boolean>;
  isAdvisor = false;
  currentUser: User | null = null;
  UserStatus = UserStatus; // Para usar en el template

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.isDarkMode$ = this.themeService.darkMode$;
  }

  ngOnInit() {
    // Suscribirse a los cambios del usuario
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAdvisor = user?.role === UserRole.ADVISOR;
      this.userName = user?.name || '';
      this.userRole = user?.role || '';
      this.userServices = user?.services || [];
    });
  }

  toggleStatus() {
    if (!this.currentUser) return;

    const newStatus = this.currentUser.status === UserStatus.ACTIVE
      ? UserStatus.ON_BREAK
      : UserStatus.ACTIVE;

    this.authService.updateUserStatus(this.currentUser.id, newStatus);
  }

  getStatusButtonClasses(): string {
    const isActive = this.currentUser?.status === UserStatus.ACTIVE;
    return `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
        : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700'
    }`;
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  logout() {
    this.authService.logout();
  }
}
