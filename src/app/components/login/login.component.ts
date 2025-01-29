import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;
  logoPath: string = 'assets/images/serviciudad-logo.png';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.error = '';
    this.loading = true;

    if (!this.username || !this.password) {
      this.error = 'Por favor ingrese usuario y contraseña';
      this.loading = false;
      return;
    }

    const success = this.authService.login(this.username, this.password);
    
    if (success) {
      const user = this.authService.getCurrentUser();
      if (user?.role === UserRole.CLIENT) {
        window.open('/called-turns', '_blank');
        this.router.navigate(['/']);
      } else if (user?.role === UserRole.ADVISOR) {
        this.router.navigate(['/dashboard']);
      } else if (user?.role === UserRole.COORDINATOR) {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
    this.loading = false;
  }
} 