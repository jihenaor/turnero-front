import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Turn } from '../models/turn.model';
@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = `${environment.apiUrl}/api/turns`;
  private maxRetries = 5;
  private retryCount = 0;
  private eventSource: EventSource | null = null;

  // Signal reactivo que almacena la lista de turnos en espera
  turnos = signal<any[]>([]);

  constructor(private http: HttpClient) {
  // this.cargarTurnosIniciales();
    this.conectarSSE();
  }

  public conectarSSE() {
    // Cerrar conexión existente si hay una
    if (this.eventSource) {
      this.eventSource.close();
    }

    try {
      // Usar URL relativa que será manejada por el proxy
      this.eventSource = new EventSource(`${this.apiUrl}/stream`);

      this.eventSource.onmessage = (event) => {
        debugger;
        const turnoActualizado = JSON.parse(event.data);
        this.actualizarTurno(turnoActualizado);
      };

      this.eventSource.onopen = () => {
        console.log('Conexión SSE establecida o actualizada');
        this.retryCount = 0;
      };

      this.eventSource.onerror = (error) => {
        console.error('Error en SSE:', error);
        this.eventSource?.close();
        this.eventSource = null;

        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          console.log(`Reintento ${this.retryCount} de ${this.maxRetries}`);
          setTimeout(() => this.conectarSSE(), 5000);
        } else {
          console.warn('Se alcanzó el límite de reconexiones para SSE.');
        }
      };
    } catch (error) {
      console.error('Error al crear EventSource:', error);
    }
  }

  private actualizarTurno(turnoActualizado: any) {
    console.log('Actualizando turno:', turnoActualizado);
    this.turnos.update(turnos => {
      const indice = turnos.findIndex(turno => turno.id === turnoActualizado.id);
      if (indice !== -1) {
        // Si el turno existe, se actualiza
        return turnos.map(turno => turno.id === turnoActualizado.id ? turnoActualizado : turno);
      } else {
        // Si no existe, se agrega al final de la lista
        return [...turnos, turnoActualizado];
      }
    });
  }


  public callTurn(turnId: number, module: string, advisorId: number): void {
    this.http.put<Turn>(`${this.apiUrl}/${turnId}/${module}/${advisorId}/call-turn`, null)
      .subscribe({
        next: (updatedTurn) => {
          this.turnos.update(turns =>
            turns.map(turn => turn.id === updatedTurn.id ? updatedTurn : turn)
          );
        },
        error: (error) => console.error('Error al llamar turno:', error)
      });
  }

  public getTurnsOnCall() {
    this.http.get<any[]>(`${this.apiUrl}/on-call`)
      .subscribe({
        next: (turnos) => {
          this.turnos.set(turnos);
        },
        error: (error) => console.error('Error al cargar turnos iniciales:', error)
      });
  }

  public getTurnsOnWaiting() {
    this.http.get<any[]>(`${this.apiUrl}/on-waiting`)
      .subscribe({
        next: (turnos) => {
          this.turnos.set(turnos);
        },
        error: (error) => console.error('Error al cargar turnos iniciales:', error)
      });
  }

  public createTurn(turn: Turn) {
    return this.http.post<Turn>(this.apiUrl, turn);
  }

  ngOnDestroy() {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
