import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnService } from '../../services/turn.service';
import { TurnDisplayComponent } from '../turn-display/turn-display.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LogoHeaderComponent } from '../shared/logo-header/logo-header.component';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';
import { DuplicateBillComponent } from '../duplicate-bill/duplicate-bill.component';

@Component({
  selector: 'app-turn-request',
  templateUrl: './turn-request.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TurnDisplayComponent,
    LogoHeaderComponent,
    DuplicateBillComponent
  ]
})
export class TurnRequestComponent implements OnInit {
  @ViewChild('identificationInput') identificationInput!: ElementRef;

  selectedService: string = '';
  selectedServiceId: number = 0;
  selectedServiceObj?: Service;
  userIdentification: string = '';
  showTurnDisplay = false;
  currentTurn: any = null;
  services: Service[] = [];
  requiresPriority: string = '';
  priorityDetails: string = '';
  adjustmentOptions: string[] = [
    'Discapacidad auditiva',
    'Discapacidad visual',
    'Discapacidad motriz',
    'Discapacidad cognitiva',
    'Discapacidad del habla',
    'Otro apoyo necesario'
  ];


  // Nuevas propiedades para el logout
  isLogoutDialogVisible: boolean = false;
  logoutPassword: string = '';
  private readonly LOGOUT_PASSWORD = '123456'; // En un caso real, esto vendría de una configuración o servicio

  showDuplicateBillModal = false;

  constructor(
    private serviceService: ServiceService,
    private turnService: TurnService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.serviceService.getServices().subscribe(services => {
      this.services = services.filter(service => service.isActive);
    });
  }

  onServiceSelect(service: Service) {
    this.selectedService = service.name;
    this.selectedServiceId = service.id!;
    this.selectedServiceObj = service;

    setTimeout(() => {
      this.identificationInput.nativeElement.focus();
    });
  }

  async generateTurn() {
    if (!this.selectedServiceObj) return;

    const turnData = {
      service: this.selectedService,
      serviceId: this.selectedServiceId,
      letter: this.selectedServiceObj.letter,
      identification: this.userIdentification,
      requiresPriority: this.requiresPriority === 'si',
      priorityDetails: this.requiresPriority === 'si' ? this.priorityDetails : null
    };

    try {
      this.currentTurn = await this.turnService.generateTurn(turnData);
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
    this.requiresPriority = '';
    this.priorityDetails = '';
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
    this.selectedService = '';
  }

  cancelSelection() {
    this.selectedService = '';
    this.userIdentification = '';
    this.requiresPriority = '';
    this.priorityDetails = '';
    this.focusIdentificationInput();
  }

  focusIdentificationInput() {
    setTimeout(() => {
      this.identificationInput.nativeElement.focus();
    });
  }
}
