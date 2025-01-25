import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Si el usuario está autenticado, redirigir según su rol
    const user = authService.getCurrentUser();
    if (user) {
      switch (user.role) {
        case 'COORDINATOR':
          router.navigate(['/dashboard']);
          break;
        case 'ADVISOR':
          router.navigate(['/dashboard/my-pending-turns']);
          break;
        case 'CLIENT':
          router.navigate(['/']);
          break;
      }
    }
    return false;
  }

  return true;
}; 