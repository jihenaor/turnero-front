import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="flex justify-between items-center px-4 py-3">
        <div class="flex items-center">
          <span class="text-xl font-semibold text-gray-800 dark:text-white">{{ userName }}</span>
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">{{ userRole }}</span>
        </div>
        <div class="flex items-center space-x-4">
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
export class HeaderComponent {
  userName: string;
  userRole: string;
  isDarkMode$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
    this.isDarkMode$ = this.themeService.darkMode$;
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  logout() {
    this.authService.logout();
  }
} 