import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnService } from '../../services/turn.service';
import { AuthService } from '../../services/auth.service';
import { TurnDisplayComponent } from '../turn-display/turn-display.component';
import { CompletedTurnsSummaryComponent } from '../completed-turns-summary/completed-turns-summary.component';
import { Turn } from '../../models/turn.model';
import { TurnAttentionEditComponent } from '../turn-attention-edit/turn-attention-edit.component';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-my-completed-turns',
  standalone: true,
  imports: [
    CommonModule,
    CompletedTurnsSummaryComponent,
    TurnAttentionEditComponent
  ],
  templateUrl: './my-completed-turns.component.html'
})
export class MyCompletedTurnsComponent implements OnInit {
  currentAdvisorId: number | undefined;
  showTurnDisplay: boolean = false;
  selectedTurn: Turn | null = null;

  constructor(
    private authService: AuthService,
    public turnoService: TurnoService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentAdvisorId = currentUser.id;
      this.turnoService.getTurnsOnCompleted();
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
