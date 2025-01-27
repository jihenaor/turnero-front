import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnService } from '../../services/turn.service';
import { TurnDisplayComponent } from '../turn-display/turn-display.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LogoHeaderComponent } from '../shared/logo-header/logo-header.component';

@Component({
  selector: 'app-turn-request',
  templateUrl: './turn-request.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, TurnDisplayComponent, LogoHeaderComponent]
})
export class TurnRequestComponent {
  @ViewChild('identificationInput') identificationInput!: ElementRef;
  
  selectedService: string = '';
  userIdentification: string = '';
  showTurnDisplay = false;
  currentTurn: any = null;

  // Nuevas propiedades para el logout
  isLogoutDialogVisible: boolean = false;
  logoutPassword: string = '';
  private readonly LOGOUT_PASSWORD = '123456'; // En un caso real, esto vendría de una configuración o servicio

  constructor(
    private turnService: TurnService,
    private authService: AuthService,
    private router: Router
  ) {}

  onServiceSelect(service: string) {
    this.selectedService = service;
    // Focus en el input después de seleccionar servicio
    setTimeout(() => {
      this.identificationInput.nativeElement.focus();
    });
  }

  async generateTurn(serviceType: string) {
    try {
      this.currentTurn = await this.turnService.generateTurn(serviceType, 'GUEST');
      this.showTurnDisplay = true;
    } catch (error) {
      console.error('Error al generar turno:', error);
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

  handleDisplayComplete() {
//    this.router.navigate(['']);
    this.showTurnDisplay = false;
  }
}
