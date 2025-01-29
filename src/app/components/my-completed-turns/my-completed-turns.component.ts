import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnService } from '../../services/turn.service';
import { AuthService } from '../../services/auth.service';
import { TurnDisplayComponent } from '../turn-display/turn-display.component';
import { CompletedTurnsSummaryComponent } from '../completed-turns-summary/completed-turns-summary.component';
import { Turn } from '../../models/turn.model';

@Component({
  selector: 'app-my-completed-turns',
  standalone: true,
  imports: [CommonModule, TurnDisplayComponent, CompletedTurnsSummaryComponent],
  templateUrl: './my-completed-turns.component.html'
})
export class MyCompletedTurnsComponent implements OnInit {
  completedTurns: Turn[] = [];
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
      this.loadCompletedTurns();
    }
  }

  loadCompletedTurns() {
    if (this.currentAdvisorId) {
      this.turnService.getCompletedTurns(this.currentAdvisorId).subscribe(turns => {
        this.completedTurns = turns;
      });
    }
  }

  viewTurnDetails(turn: Turn) {
    this.selectedTurn = turn;
    this.showTurnDisplay = true;
  }

  closeTurnDisplay() {
    this.showTurnDisplay = false;
    this.selectedTurn = null;
  }

} 