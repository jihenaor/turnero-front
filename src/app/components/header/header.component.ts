import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white shadow">
      <div class="flex justify-between items-center px-4 py-3">
        <div class="flex items-center">
          <span class="text-xl font-semibold text-gray-800">{{ userName }}</span>
          <span class="ml-2 text-sm text-gray-600">{{ userRole }}</span>
        </div>
        <button (click)="logout()" 
                class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
          Cerrar Sesión
        </button>
      </div>
    </header>
  `
})
export class HeaderComponent {
  userName: string;
  userRole: string;

  constructor(private authService: AuthService) {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
  }

  logout() {
    this.authService.logout();
  }
} 