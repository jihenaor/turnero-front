import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnService, Turn } from '../../services/turn.service';
import { AuthService } from '../../services/auth.service';
import { TurnDisplayComponent } from '../turn-display/turn-display.component';

@Component({
  selector: 'app-my-pending-turns',
  standalone: true,
  imports: [CommonModule, TurnDisplayComponent],
  templateUrl: './my-pending-turns.component.html'
})
export class MyPendingTurnsComponent implements OnInit {
  pendingTurns: Turn[] = [];
  currentAdvisorId: number | undefined;
  showTurnDisplay: boolean = false;
  selectedTurn: Turn | null = null;

  constructor(
    private turnService: TurnService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentAdvisorId = currentUser.id;
      this.loadPendingTurns();
    }
  }

  loadPendingTurns() {
    if (this.currentAdvisorId) {
      this.turnService.getPendingTurns().subscribe(turns => {
        this.pendingTurns = turns;
      });
    }
  }

  callTurn(turn: Turn) {
    if (this.currentAdvisorId) {
      this.turnService.callTurn(turn.id, 'Módulo 1', this.currentAdvisorId);
      this.selectedTurn = turn;
      this.showTurnDisplay = true;
      this.loadPendingTurns();
    }
  }

  getWaitingTime(turn: Turn): number {
    const now = new Date();
    const waitingTime = Math.floor((now.getTime() - turn.createdAt.getTime()) / (1000 * 60));
    return waitingTime;
  }

  closeTurnDisplay() {
    this.showTurnDisplay = false;
    this.selectedTurn = null;
  }
} 