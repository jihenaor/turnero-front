import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuItem, MENU_ITEMS } from '../../models/menu.model';
import { UserRole, UserDTO } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  currentUser: UserDTO | null = null;
  private userSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser$.subscribe({
      next: (user) => {
        console.log('Dashboard: Usuario recibido:', user);
        this.currentUser = user;
        if (user) {
          this.menuItems = MENU_ITEMS.filter(item => item.roles.includes(user.role));
        } else {
          console.warn('Dashboard: Usuario es null');
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Dashboard: Error en la suscripción:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 