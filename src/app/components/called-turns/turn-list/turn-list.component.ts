import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../../models/turn.model';
import { TurnService } from '../../../services/turn.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-turn-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turn-list.component.html'
})
export class TurnListComponent {
  logoPath: string = 'assets/images/serviciudad-logo.png';

  calledTurns: Signal<Turn[]>;

  constructor(private turnService: TurnService) {
    this.calledTurns = computed(() => this.turnService.getCalledTurnsSignal());
  }
} 