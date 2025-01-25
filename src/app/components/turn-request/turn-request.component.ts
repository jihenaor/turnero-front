import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnService } from '../../services/turn.service';
import { TurnDisplayComponent } from '../turn-display/turn-display.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-turn-request',
  templateUrl: './turn-request.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, TurnDisplayComponent]
})
export class TurnRequestComponent {
  selectedService: string = '';
  userIdentification: string = '';
  showTurnDisplay: boolean = false;
  currentTurn: any = null;

  // Nuevas propiedades para el logout
  isLogoutDialogVisible: boolean = false;
  logoutPassword: string = '';
  private readonly LOGOUT_PASSWORD = '123456'; // En un caso real, esto vendría de una configuración o servicio

  constructor(
    public turnService: TurnService,
    private authService: AuthService,
    private router: Router
  ) {}

  onServiceSelect(service: string) {
    this.selectedService = service;
  }

  generateTurn() {
    if (this.selectedService && this.userIdentification) {
      this.currentTurn = this.turnService.generateTurn(
        this.selectedService,
        this.userIdentification
      );
      this.showTurnDisplay = true;
    }
  }

  resetForm() {
    this.selectedService = '';
    this.userIdentification = '';
    this.showTurnDisplay = false;
    this.currentTurn = null;
  }

  showLogoutDialog() {
    this.isLogoutDialogVisible = true;
    this.logoutPassword = '';
  }

  cancelLogout() {
    this.isLogoutDialogVisible = false;
    this.logoutPassword = '';
  }

  confirmLogout() {
    if (this.logoutPassword === this.LOGOUT_PASSWORD) {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      // Mostrar mensaje de error
      alert('Clave de seguridad incorrecta');
    }
    this.isLogoutDialogVisible = false;
    this.logoutPassword = '';
  }
}
