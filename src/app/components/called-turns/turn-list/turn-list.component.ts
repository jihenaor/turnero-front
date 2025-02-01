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

  private audioContext: AudioContext | null = null;

  constructor(private turnService: TurnService,
    private turnoService: TurnoService
  ) {
    this.calledTurns = computed(() => {
      const turns = this.turnService.getCalledTurnsSignal();
      console.log('Cambio detectado en turnos:', turns);
      if (turns && turns.length > 0) {
        console.log('Hay turnos, intentando reproducir sonido');
        setTimeout(() => {
          this.reproducirPitido();
        }, 0);
      }
      return turns;
    });

    this.turnos = this.turnoService.turnos;
  }

  // Signal para obtener la lista de turnos desde el servicio
  turnos: Signal<any[]>;


  ngOnInit() {
    // Cargar los turnos iniciales si es necesario
    //this.cargarTurnos();
  }

  private cargarTurnos() {
    // Aquí podrías hacer una petición HTTP inicial si es necesario
  }

  async inicializarAudio() {
    console.log('Iniciando inicialización de audio');
    try {
      this.audioContext = new AudioContext();
      console.log('Audio inicializado correctamente');
      // Intentamos reproducir el sonido inmediatamente después de inicializar
      await this.reproducirPitido();
    } catch (error) {
      console.error('Error al inicializar el audio:', error);
    }
  }

  private async reproducirPitido() {
    console.log('Intentando reproducir pitido');
    try {
      if (!this.audioContext) {
        console.log('AudioContext no inicializado, inicializando...');
        await this.inicializarAudio();
        return;
      }

      const audio = new Audio();
      console.log('Intentando cargar audio desde:', '/assets/sounds/mixkit-clear-announce-tones-2861.wav');
      audio.src = '/assets/sounds/mixkit-clear-announce-tones-2861.wav';
      console.log('Audio cargado, intentando reproducir');

      // Esperamos a que el audio esté cargado
      await new Promise((resolve) => {
        audio.oncanplaythrough = resolve;
        audio.load();
      });

      console.log('Audio listo para reproducir');
      await audio.play();
      console.log('Audio reproducido exitosamente');
    } catch (error) {
      console.error('Error detallado al reproducir el sonido:', error);
    }
  }
}
