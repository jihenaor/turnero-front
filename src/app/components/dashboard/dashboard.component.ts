import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuItem, MENU_ITEMS } from '../../models/menu.model';
import { UserRole, UserDTO } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  menuItems: MenuItem[] = [];
  currentUser: UserDTO | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.menuItems = MENU_ITEMS.filter(item => item.roles.includes(user.role));
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 