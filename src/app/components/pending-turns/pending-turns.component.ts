import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../models/turn.model';
import { TurnService } from '../../services/turn.service';
import { AdvisorService, Advisor } from '../../services/advisor.service';

@Component({
  selector: 'app-pending-turns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-turns.component.html'
})
export class PendingTurnsComponent implements OnInit {
  pendingTurns: Turn[] = [];
  availableAdvisors: Advisor[] = [];

  constructor(
    private turnService: TurnService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit() {
    this.loadPendingTurns();
    this.loadAvailableAdvisors();
  }

  loadPendingTurns() {
    this.turnService.getPendingTurns().subscribe(turns => {
      this.pendingTurns = turns.sort((a, b) => {
        // Primero los prioritarios
        if (a.isPriority && !b.isPriority) return -1;
        if (!a.isPriority && b.isPriority) return 1;
        // Luego por fecha de creación
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    });
  }

  loadAvailableAdvisors() {
    this.advisorService.getAdvisors().subscribe(advisors => {
      this.availableAdvisors = advisors.filter(a => a.isAvailable);
    });
  }

  getWaitingTime(createdAt: Date): number {
    return Math.floor((new Date().getTime() - new Date(createdAt).getTime()) / 60000);
  }

  getTimeClass(waitingTime: number): string {
    if (waitingTime < 15) return 'text-green-600';
    if (waitingTime < 30) return 'text-yellow-600';
    return 'text-red-600';
  }

  assignTurn(turn: Turn, advisor: Advisor) {
    if (this.advisorService.assignNextClient(advisor.id, turn)) {
      this.turnService.callTurn(turn.id!, `Módulo ${advisor.id}`, advisor.id);
      this.loadPendingTurns();
      this.loadAvailableAdvisors();
    }
  }
} 