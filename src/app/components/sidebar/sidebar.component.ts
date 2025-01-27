import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MENU_ITEMS, MenuItem } from '../../models/menu.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div class="flex items-center mb-6">
        <img src="assets/images/serviciudad-logo.png" alt="Logo" class="h-10">
      </div>
      
      <nav>
        <ul class="space-y-2">
          <li *ngFor="let item of menuItems">
            <ng-container *ngIf="shouldShowMenuItem(item)">
              <!-- Menú principal -->
              <div *ngIf="!item.subItems" class="block">
                <a [routerLink]="item.route"
                   routerLinkActive="bg-gray-900"
                   class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700">
                  <span [class]="item.icon" class="mr-3"></span>
                  {{ item.label }}
                </a>
              </div>
              
              <!-- Menú con subítems -->
              <div *ngIf="item.subItems" class="block">
                <button (click)="item.isOpen = !item.isOpen"
                        class="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-700">
                  <span [class]="item.icon" class="mr-3"></span>
                  {{ item.label }}
                  <svg class="w-4 h-4 ml-auto" [class.rotate-180]="item.isOpen" 
                       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" 
                          stroke-linecap="round" stroke-linejoin="round" 
                          stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <!-- Submenú -->
                <div *ngIf="item.isOpen" class="mt-2 ml-6 space-y-2">
                  <a *ngFor="let subItem of item.subItems"
                     [routerLink]="subItem.route"
                     routerLinkActive="bg-gray-900"
                     class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700">
                    <span [class]="subItem.icon" class="mr-3"></span>
                    {{ subItem.label }}
                  </a>
                </div>
              </div>
            </ng-container>
          </li>
        </ul>
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  menuItems = MENU_ITEMS;

  constructor(private authService: AuthService) {}

  shouldShowMenuItem(item: MenuItem): boolean {
    const userRole = this.authService.getUserRole();
    return item.roles.includes(userRole);
  }
} 