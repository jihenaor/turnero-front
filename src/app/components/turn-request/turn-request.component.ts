import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurnService } from '../../services/turn.service';
import { TurnDisplayComponent } from '../turn-display/turn-display.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LogoHeaderComponent } from '../shared/logo-header/logo-header.component';
import { ServiceService } from '../../services/services.service';
import { Service } from '../../models/service.model';
import { DuplicateBillComponent } from '../duplicate-bill/duplicate-bill.component';
import { TurnoService } from '../../services/turno.service';
import { Turn } from '../../models/turn.model';

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

  requiresPriority: string = '';
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
    public serviceService: ServiceService,
    private turnService: TurnService,
    private authService: AuthService,
    private router: Router,
    private turnoService: TurnoService,
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    this.serviceService.getServices();
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

    const turnData: Turn = {
      service: this.selectedService,
      serviceId: this.selectedServiceId,
      identification: this.userIdentification,
      userIdentification: this.userIdentification,
      status: 'WAITING',
      isPriority: this.requiresPriority === 'si',
      createdAt: new Date(),
      createdTimeStr: new Date().toLocaleTimeString(),
    };

    this.turnoService.createTurn(turnData).subscribe(turn => {
      console.log('Turno creado:', turn);
      this.currentTurn = turn;
      this.showTurnDisplay = true;
    });
  }

  resetForm() {
    this.selectedService = '';
    this.userIdentification = '';
    this.showTurnDisplay = false;
    this.currentTurn = null;
    this.requiresPriority = '';
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
    this.focusIdentificationInput();
  }

  focusIdentificationInput() {
    setTimeout(() => {
      this.identificationInput.nativeElement.focus();
    });
  }
}
