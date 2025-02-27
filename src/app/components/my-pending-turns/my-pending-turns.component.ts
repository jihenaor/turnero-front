import { Component, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnAttentionComponent } from '../turn-attention/turn-attention.component';
import { TurnService } from '../../services/turn.service';
import { AuthService } from '../../services/auth.service';
import { Turn } from '../../models/turn.model';
import { TimeService } from '../../services/time.service';
import { ServiceDetailsComponent } from '../service-details/service-details.component';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-my-pending-turns',
  standalone: true,
  imports: [
    CommonModule,
    TurnAttentionComponent,
    ServiceDetailsComponent
  ],
  templateUrl: './my-pending-turns.component.html'
})
export class MyPendingTurnsComponent implements OnInit {
  turnos: Signal<Turn[]>;
  currentAdvisorId: number | undefined;
  showAttentionModal: boolean = false;
  selectedTurn: Turn | null = null;
  showServiceDetails = false;

  constructor(
    private authService: AuthService,
    private timeService: TimeService,
    private turnoService: TurnoService
  ) {
    const user = this.authService.getCurrentUser();
    this.currentAdvisorId = user?.id;

    this.turnos = this.turnoService.turnos;
  }

  ngOnInit() {
    this.turnoService.getTurnsOnWaitingCalled();

    // Observa los cambios en el signal para reproducir un pitido si hay turnos en llamado
    computed(() => {
      const turns = this.turnos();
      if (turns && turns.length > 0) {
        console.log('Hay turnos en llamado, reproduciendo pitido');

      }
    });
  }

  getWaitingTime(turn: Turn): number {
    return this.timeService.calculateWaitingTime(turn.createdTimeStr);
  }

  callTurn(turn: Turn) {
    if (turn.id != null && this.currentAdvisorId != null) {
      this.turnoService.callTurn(turn.id, '1', this.currentAdvisorId);
    } else {
      console.error('Turn id or currentAdvisorId is null or undefined');
      return;
    }

    this.selectedTurn = turn;
    this.showAttentionModal = true;
  }

  attendTurnCalled(turn: Turn) {
    this.selectedTurn = turn;
    this.showAttentionModal = true;
  }

  handleFinishAttention(attentionData: any) {
    if (this.currentAdvisorId && this.selectedTurn?.id) {

      console.log('Atención finalizada:', attentionData);
      // this.loadPendingTurns();
    }
    this.showAttentionModal = false;
    this.selectedTurn = null;
  }

  isFirstTurn(turn: Turn): boolean {
    return this.turnos().indexOf(turn) === 0;
  }

  showServiceInfo(turn: Turn) {
    this.selectedTurn = turn;
    this.showServiceDetails = true;
  }

  closeServiceDetails() {
    this.showServiceDetails = false;
    this.selectedTurn = null;
  }
}
