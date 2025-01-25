import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Turn {
  id: number;
  number: string;
  service: string;
  status: 'WAITING' | 'CALLED' | 'COMPLETED';
  module?: string;
  advisorId?: number;
  createdAt: Date;
  calledAt?: Date;
  completedAt?: Date;
  userIdentification: string;
  isPriority: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private turns = new BehaviorSubject<Turn[]>([]);
  private calledTurns = new BehaviorSubject<Turn[]>([]);

  constructor() {
    // Inicializar con datos de prueba
    this.turns.next([
      {
        id: 1,
        number: 'A001',
        service: 'Atención al Cliente',
        status: 'WAITING',
        createdAt: new Date(),
        userIdentification: '12345678',
        isPriority: false
      },
      {
        id: 2,
        number: 'A002',
        service: 'Pagos',
        status: 'WAITING',
        createdAt: new Date(Date.now() - 3600000), // 1 hora antes
        calledAt: new Date(Date.now() - 3540000),  // 59 minutos antes
        completedAt: new Date(Date.now() - 3480000), // 58 minutos antes
        module: 'Módulo 1',
        advisorId: 1,
        userIdentification: '87654321',
        isPriority: false
      },
      {
        id: 3,
        number: 'A003',
        service: 'Reclamos',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 7200000), // 2 horas antes
        calledAt: new Date(Date.now() - 7140000),  // 119 minutos antes
        completedAt: new Date(Date.now() - 7080000), // 118 minutos antes
        module: 'Módulo 2',
        advisorId: 1,
        userIdentification: '11223344',
        isPriority: true
      },
      {
        id: 4,
        number: 'A004',
        service: 'Atención al Cliente',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 1800000), // 30 minutos antes
        calledAt: new Date(Date.now() - 1740000),  // 29 minutos antes
        completedAt: new Date(Date.now() - 1680000), // 28 minutos antes
        module: 'Módulo 1',
        advisorId: 1,
        userIdentification: '99887766',
        isPriority: false
      },
      {
        id: 5,
        number: 'A005',
        service: 'Pagos',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 900000), // 15 minutos antes
        calledAt: new Date(Date.now() - 840000),  // 14 minutos antes
        completedAt: new Date(Date.now() - 780000), // 13 minutos antes
        module: 'Módulo 3',
        advisorId: 1,
        userIdentification: '55443322',
        isPriority: true
      }
    ]);

    this.updateCalledTurns();
  }

  getPendingTurns(): Observable<Turn[]> {
    return this.turns.pipe(
      map(turns => turns.filter(turn => turn.status === 'WAITING'))
    );
  }

  getCalledTurns(): Observable<Turn[]> {
    return this.calledTurns.asObservable();
  }

  generateTurn(service: string, userIdentification: string): Turn {
    const newTurn: Turn = {
      id: this.turns.value.length + 1,
      number: `A${String(this.turns.value.length + 1).padStart(3, '0')}`,
      service,
      status: 'WAITING',
      createdAt: new Date(),
      userIdentification,
      isPriority: false
    };

    const currentTurns = [...this.turns.value, newTurn];
    this.turns.next(currentTurns);
    return newTurn;
  }

  callTurn(turnId: number, module: string, advisorId: number) {
    const currentTurns = this.turns.value;
    const turnIndex = currentTurns.findIndex(t => t.id === turnId);
    
    if (turnIndex !== -1) {
      currentTurns[turnIndex].status = 'CALLED';
      currentTurns[turnIndex].module = module;
      currentTurns[turnIndex].advisorId = advisorId;
      
      this.turns.next(currentTurns);
      this.updateCalledTurns();
    }
  }

  private updateCalledTurns() {
    const calledTurns = this.turns.value.filter(t => t.status === 'CALLED');
    this.calledTurns.next(calledTurns);
  }

  getCompletedTurns(advisorId: number): Observable<Turn[]> {
    return this.turns.pipe(
      map(turns => turns.filter(turn => 
        turn.status === 'COMPLETED' && 
        turn.advisorId === advisorId
      ))
    );
  }
}
