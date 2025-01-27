import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, HeaderComponent],
  template: `
    <div class="flex h-screen bg-white dark:bg-gray-900">
      <app-sidebar></app-sidebar>
      <div class="flex-1 flex flex-col overflow-hidden">
        <app-header></app-header>
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class DashboardComponent {} 