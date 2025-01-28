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
  private attentionTurns = new BehaviorSubject<Turn[]>([]);
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
        userIdentification: '98765432',
        status: 'CALLED',
        createdAt: new Date(Date.now() - 1200000), // 20 minutos antes
        calledAt: new Date(Date.now() - 900000), // 15 minutos antes
        advisorId: 2,
        isPriority: false
      },
      {
        id: 9,
        turnNumber: 'C009',
        turnCode: 'C009',
        module: 'Módulo 3',
        service: 'Reclamos',
        userIdentification: '11223344',
        status: 'CALLED',
        createdAt: new Date(Date.now() - 900000), // 15 minutos antes
        calledAt: new Date(Date.now() - 600000), // 10 minutos antes
        advisorId: 3,
        isPriority: true,
        priorityDetails: 'Discapacidad visual'
      },
      {
        id: 10,
        turnNumber: 'A010',
        turnCode: 'A010',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '44556677',
        status: 'CALLED',
        createdAt: new Date(Date.now() - 600000), // 10 minutos antes
        calledAt: new Date(Date.now() - 300000), // 5 minutos antes
        advisorId: 1,
        isPriority: true,
        priorityDetails: 'Adulto mayor'
      },
      {
        id: 11,
        turnNumber: 'A011',
        turnCode: 'A011',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '33445566',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 7200000), // 2 horas antes
        calledAt: new Date(Date.now() - 7180000),  // 2h - 20s
        completedAt: new Date(Date.now() - 7000000), // 2h - 3min
        advisorId: 1,
        isPriority: false
      },
      {
        id: 12,
        turnNumber: 'B012',
        turnCode: 'B012',
        module: 'Módulo 2',
        service: 'Pagos',
        userIdentification: '77889900',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 6000000), // 100 minutos antes
        calledAt: new Date(Date.now() - 5980000),  // 99.6 minutos antes
        completedAt: new Date(Date.now() - 5800000), // 96.6 minutos antes
        advisorId: 2,
        isPriority: true,
        priorityDetails: 'Adulto mayor'
      },
      {
        id: 13,
        turnNumber: 'C013',
        turnCode: 'C013',
        module: 'Módulo 3',
        service: 'Reclamos',
        userIdentification: '11223355',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 5400000), // 90 minutos antes
        calledAt: new Date(Date.now() - 5380000),  // 89.6 minutos antes
        completedAt: new Date(Date.now() - 5200000), // 86.6 minutos antes
        advisorId: 3,
        isPriority: false
      },
      {
        id: 14,
        turnNumber: 'A014',
        turnCode: 'A014',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '99887755',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 4800000), // 80 minutos antes
        calledAt: new Date(Date.now() - 4780000),  // 79.6 minutos antes
        completedAt: new Date(Date.now() - 4600000), // 76.6 minutos antes
        advisorId: 1,
        isPriority: true,
        priorityDetails: 'Embarazada'
      },
      {
        id: 15,
        turnNumber: 'B015',
        turnCode: 'B015',
        module: 'Módulo 2',
        service: 'Pagos',
        userIdentification: '44556688',
        status: 'COMPLETED',
        createdAt: new Date(Date.now() - 3600000), // 60 minutos antes
        calledAt: new Date(Date.now() - 3580000),  // 59.6 minutos antes
        completedAt: new Date(Date.now() - 3400000), // 56.6 minutos antes
        advisorId: 2,
        isPriority: false
      }
    ]);

    this.updateCalledTurns();
    this.updateAttentionTurns();
  }

  getPendingTurns(): Observable<Turn[]> {
    return this.turns.pipe(
      map(turns => turns.filter(t => t.status === 'WAITING'))
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
      module: '',
      service: service,
      userIdentification: identification,
      isPriority: requiresPriority,
      priorityDetails: requiresPriority ? priorityDetails : null,
      status: 'WAITING',
      createdAt: new Date()
    };
  
    const currentTurns = [...this.turns.value, turn];
    this.turns.next(currentTurns);
    return turn;
  }
  

  callTurn(turnId: number, module: string, advisorId: number) {
    this.startAttention(turnId, advisorId, module);
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

  getTurnById(id: number): Observable<Turn | undefined> {
    return this.turns.pipe(
      map(turns => turns.find(turn => turn.id === id))
    );
  }

  startAttention(turnId: number, advisorId: number, module: string) {
    const currentTurns = this.turns.value;
    const turnIndex = currentTurns.findIndex(t => t.id === turnId);
    
    if (turnIndex !== -1) {
      // Actualizar el estado del turno a "en atención"
      currentTurns[turnIndex] = {
        ...currentTurns[turnIndex],
        status: 'CALLED',
        module,
        advisorId,
        calledAt: new Date()
      };
      
      this.turns.next(currentTurns);
      this.updateAttentionTurns();
    }
  }

  finishAttention(turnId: number) {
    const currentTurns = this.turns.value;
    const turnIndex = currentTurns.findIndex(t => t.id === turnId);
    
    if (turnIndex !== -1) {
      // Actualizar el estado del turno a "completado"
      currentTurns[turnIndex] = {
        ...currentTurns[turnIndex],
        status: 'COMPLETED',
        completedAt: new Date()
      };
      
      this.turns.next(currentTurns);
      this.updateAttentionTurns();
    }
  }

  getAttentionTurns(): Observable<Turn[]> {
    return this.attentionTurns.asObservable();
  }

  private updateAttentionTurns() {
    const attentionTurns = this.turns.value.filter(t => 
      t.status === 'CALLED' && t.calledAt !== undefined
    );
    this.attentionTurns.next(attentionTurns);
  }

  getCompletedTurnsByDate(date: Date): Observable<Turn[]> {
    return this.turns.pipe(
      map(turns => turns.filter(turn => {
        if (turn.status !== 'COMPLETED' || !turn.completedAt) return false;
        
        const turnDate = new Date(turn.completedAt);
        return turnDate.getFullYear() === date.getFullYear() &&
               turnDate.getMonth() === date.getMonth() &&
               turnDate.getDate() === date.getDate();
      }))
    );
  }
}
