import { Component, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../../models/turn.model';
import { TurnService } from '../../../services/turn.service';
import { TurnoService } from '../../../services/turno.service';


@Component({
  selector: 'app-turn-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turn-list.component.html'
})
export class TurnListComponent implements OnInit {
  logoPath: string = 'assets/images/serviciudad-logo.png';

  calledTurns: Signal<Turn[]>;

  constructor(private turnService: TurnService,
    private turnoService: TurnoService
  ) {
    this.calledTurns = computed(() => this.turnService.getCalledTurnsSignal());

    this.turnos = this.turnoService.turnos;
  }

  // Signal para obtener la lista de turnos desde el servicio
  turnos: Signal<any[]>;


  ngOnInit() {
    // Cargar los turnos iniciales si es necesario
    this.cargarTurnos();
  }

  private cargarTurnos() {
    // Aquí podrías hacer una petición HTTP inicial si es necesario
  }
} 