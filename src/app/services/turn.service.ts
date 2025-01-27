import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turn } from '../models/turn.model';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private turns = new BehaviorSubject<Turn[]>([]);
  private calledTurns = new BehaviorSubject<Turn[]>([]);
  private currentNumber = 0;

  constructor() {
    // Inicializar con datos de prueba
    this.turns.next([
      {
        id: 1,
        turnNumber: 'A001',
        turnCode: 'A001',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '12345678',
        status: 'WAITING',
        createdAt: new Date()
      },
      {
        id: 2,
        turnNumber: 'A002',
        turnCode: 'A002',
        module: 'Módulo 1',
        service: 'Pagos',
        userIdentification: '87654321',
        status: 'WAITING',
        createdAt: new Date(Date.now() - 3600000) // 1 hora antes
      },
      {
        id: 3,
        turnNumber: 'A003',
        turnCode: 'A003',
        module: 'Módulo 2',
        service: 'Reclamos',
        userIdentification: '11223344',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 7200000) // 2 horas antes
      },
      {
        id: 4,
        turnNumber: 'A004',
        turnCode: 'A004',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '99887766',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 1800000) // 30 minutos antes
      },
      {
        id: 5,
        turnNumber: 'A005',
        turnCode: 'A005',
        module: 'Módulo 3',
        service: 'Pagos',
        userIdentification: '55443322',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 900000) // 15 minutos antes
      },
      {
        id: 6,
        turnNumber: 'A006',
        turnCode: 'A006',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '12345678',
        status: 'CALLED',
        createdAt: new Date()
      },
      {
        id: 7,
        turnNumber: 'A007',
        turnCode: 'A007',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '12345678',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 3600000),
        completedAt: new Date(Date.now() - 3540000),
        calledAt: new Date(Date.now() - 3580000),
        advisorId: 1,
        isPriority: true
      },
      {
        id: 8,
        turnNumber: 'B008',
        turnCode: 'B008',
        module: 'Módulo 2',
        service: 'Pagos',
        userIdentification: '87654321',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 7200000),
        completedAt: new Date(Date.now() - 7140000),
        calledAt: new Date(Date.now() - 7180000),
        advisorId: 1,
        isPriority: false
      },
      {
        id: 9,
        turnNumber: 'C009',
        turnCode: 'C009',
        module: 'Módulo 1',
        service: 'Reclamos',
        userIdentification: '11223344',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 1800000),
        completedAt: new Date(Date.now() - 1740000),
        calledAt: new Date(Date.now() - 1780000),
        advisorId: 1,
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

  generateTurn(turnData: {
    service: string;
    identification: string;
    requiresPriority: boolean;
    priorityDetails: string | null;
  }): Turn {
    const { service, identification, requiresPriority, priorityDetails } = turnData;
  
    this.currentNumber++;
  
    const turn: Turn = {
      id: this.currentNumber,
      turnNumber: `${service.charAt(0)}${this.currentNumber.toString().padStart(3, '0')}`,
      turnCode: `${service.charAt(0)}${this.currentNumber.toString().padStart(3, '0')}`,
      module: 'Módulo 1', // Esto debería ser dinámico en una implementación real
      service: service,
      userIdentification: identification,
      isPriority: requiresPriority,
      priorityDetails: requiresPriority ? priorityDetails : null, 
      status: 'WAITING',
      createdAt: new Date(),
    };
  
    const currentTurns = [...this.turns.value, turn];
    this.turns.next(currentTurns);
    return turn;
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
