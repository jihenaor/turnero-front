import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnAttentionComponent } from '../turn-attention/turn-attention.component';
import { TurnService } from '../../services/turn.service';
import { AuthService } from '../../services/auth.service';
import { Turn } from '../../models/turn.model';
import { TimeService } from '../../services/time.service';

@Component({
  selector: 'app-my-pending-turns',
  standalone: true,
  imports: [CommonModule, TurnAttentionComponent],
  templateUrl: './my-pending-turns.component.html'
})
export class MyPendingTurnsComponent implements OnInit {
  pendingTurns: Turn[] = [];
  currentAdvisorId: number | undefined;
  showAttentionModal: boolean = false;
  selectedTurn: Turn | null = null;

  constructor(
    private turnService: TurnService,
    private authService: AuthService,
    private timeService: TimeService
  ) {
    const user = this.authService.getCurrentUser();
    this.currentAdvisorId = user?.id;
  }

  ngOnInit() {
    this.loadPendingTurns();
  }

  loadPendingTurns() {
    this.turnService.getPendingTurns().subscribe(turns => {
      this.pendingTurns = turns;
    });
  }

  getWaitingTime(turn: Turn): number {
    return this.timeService.calculateWaitingTime(turn.createdTimeStr);
  }

  callTurn(turn: Turn) {
    this.selectedTurn = turn;
    this.showAttentionModal = true;
  }

  handleFinishAttention(attentionData: any) {
    if (this.currentAdvisorId && this.selectedTurn?.id) {
      this.turnService.callTurn(this.selectedTurn.id, 'Módulo 1', this.currentAdvisorId);
      console.log('Atención finalizada:', attentionData);
      this.loadPendingTurns();
    }
    this.showAttentionModal = false;
    this.selectedTurn = null;
  }

  isFirstTurn(turn: Turn): boolean {
    return this.pendingTurns.indexOf(turn) === 0;
  }
} 