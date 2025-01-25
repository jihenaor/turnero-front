import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorService, Advisor, Attention } from '../../services/advisor.service';
import { TurnService } from '../../services/turn.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-advisor-dashboard',
  templateUrl: './advisor-dashboard.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class AdvisorDashboardComponent implements OnInit {
  currentAdvisor: Advisor | null = null;
  lastCompletedAttention: Attention | null = null;
  companyConfig;

  constructor(
    private advisorService: AdvisorService,
    private turnService: TurnService,
    private configService: ConfigService
  ) {
    this.companyConfig = this.configService.getCompanyConfig();
  }

  ngOnInit() {
    this.advisorService.setCurrentAdvisor(1);
    this.advisorService.currentAdvisor$.subscribe(advisor => {
      this.currentAdvisor = advisor;
      
      // Si el asesor está disponible, intentar asignar el siguiente turno
      if (advisor?.isAvailable) {
        const nextTurn = this.turnService.getNextTurn();
        if (nextTurn) {
          this.advisorService.assignNextClient(advisor.id, nextTurn);
        }
      }
    });
  }

  // Método para simular la llegada de un nuevo cliente
  simulateNewClient() {
    const mockTurn = {
      id: `T${Math.floor(Math.random() * 1000)}`,
      service: 'Servicio de Prueba',
      userIdentification: `CLI${Math.floor(Math.random() * 1000)}`,
      date: new Date()
    };

    if (this.currentAdvisor) {
      this.advisorService.assignNextClient(this.currentAdvisor.id, mockTurn);
    }
  }

  finishAttention() {
    if (!this.currentAdvisor) return;

    const result = this.advisorService.finishAttention(this.currentAdvisor.id);
    if (result) {
      this.lastCompletedAttention = result.completedAttention;
      
      // Si no hay siguiente atención asignada, intentar obtener nuevo turno
      if (!result.nextAttention) {
        const nextTurn = this.turnService.getNextTurn();
        if (nextTurn) {
          this.advisorService.assignNextClient(this.currentAdvisor.id, nextTurn);
        }
      }
    }
  }
} 