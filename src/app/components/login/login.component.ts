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

    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        if (user) {
          if (user.role === UserRole.CLIENT) {
            // Abrir la página de turnos en llamado en una nueva pestaña
            window.open('/called-turns', '_blank');
            // Navegar a la página de solicitud de turno en la pestaña actual
            this.router.navigate(['/']);
          } else {
            this.router.navigate([user.redirectTo || '/']);
          }
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.error = 'Error al intentar iniciar sesión';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
} 