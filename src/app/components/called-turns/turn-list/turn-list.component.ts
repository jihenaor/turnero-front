import { Component, computed, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../../models/turn.model';
import { TurnoService } from '../../../services/turno.service';

@Component({
  selector: 'app-turn-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turn-list.component.html'
})
export class TurnListComponent implements OnInit {
  logoPath: string = 'assets/images/serviciudad-logo.png';

  turnos: Signal<Turn[]>;

  private audioContext: AudioContext | null = null;

  constructor(private turnoService: TurnoService) {
    this.turnos = this.turnoService.turnos;
  }

  ngOnInit() {
    // Solicita al servicio la carga de turnos en llamado
    this.turnoService.getTurnsOnCall();

    // Observa los cambios en el signal para reproducir un pitido si hay turnos en llamado
    computed(() => {
      const turns = this.turnos();
      if (turns && turns.length > 0) {
        console.log('Hay turnos en llamado, reproduciendo pitido');
        this.reproducirPitido();
      }
    });
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
