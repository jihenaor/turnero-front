import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Turn } from '../models/turn.model';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private turns = new BehaviorSubject<Turn[]>([]);
  private calledTurns = new BehaviorSubject<Turn[]>([]);

  private calledTurnsSignal = signal<Turn[]>([]);
  
  private attentionTurns = new BehaviorSubject<Turn[]>([]);
  private currentNumber = 0;

  constructor() {
    // Inicializar con datos de prueba
    const today = this.getDateWithoutTime(new Date());

    this.turns.next([
      {
        id: 1,
        turnNumber: 'A001',
        turnCode: 'A001',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '12345678',
        status: 'WAITING',
        date: today,
        createdAt: new Date(),
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
      },
      {
        id: 2,
        turnNumber: 'A002',
        turnCode: 'A002',
        module: 'Módulo 1',
        service: 'Pagos',
        userIdentification: '87654321',
        status: 'WAITING',
        date: today,
        createdAt: new Date(Date.now() - 3600000), // 1 hora antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
      },
      {
        id: 3,
        turnNumber: 'A003',
        turnCode: 'A003',
        module: 'Módulo 2',
        service: 'Reclamos',
        userIdentification: '11223344',
        status: 'COMPLETED',
        date: today,
        createdAt: new Date(Date.now() - 7200000), // 2 horas antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
      },
      {
        id: 4,
        turnNumber: 'A004',
        turnCode: 'A004',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '99887766',
        status: 'COMPLETED',
        date: today,
        createdAt: new Date(Date.now() - 1800000), // 30 minutos antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
      },
      {
        id: 5,
        turnNumber: 'A005',
        turnCode: 'A005',
        module: 'Módulo 3',
        service: 'Pagos',
        userIdentification: '55443322',
        status: 'COMPLETED',
        date: today,
        createdAt: new Date(Date.now() - 900000), // 15 minutos antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
      },
      {
        id: 6,
        turnNumber: 'A006',
        turnCode: 'A006',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '12345678',
        status: 'CALLED',
        date: today,
        createdAt: new Date(),
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
      },
      {
        id: 7,
        turnNumber: 'A007',
        turnCode: 'A007',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '12345678',
        status: 'COMPLETED',
        date: today,
        createdAt: new Date(Date.now() - 3600000),
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        completedAt: new Date(Date.now() - 3540000),
        calledAt: new Date(Date.now() - 3580000),
        advisorId: 1,
        isPriority: true,
        waitingTime: 3, // 20 segundos en minutos
        attentionTime: 7 // 3 minutos
      },
      {
        id: 8,
        turnNumber: 'B008',
        turnCode: 'B008',
        module: 'Módulo 2',
        service: 'Pagos',
        userIdentification: '98765432',
        status: 'CALLED',
        date: today,
        createdAt: new Date(Date.now() - 1200000), // 20 minutos antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
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
        date: today,
        createdAt: new Date(Date.now() - 900000), // 15 minutos antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
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
        date: today,
        createdAt: new Date(Date.now() - 600000), // 10 minutos antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
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
        date: today,
        createdAt: new Date(Date.now() - 7200000), // 2 horas antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        calledAt: new Date(Date.now() - 7180000),  // 2h - 20s
        calledTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        completedAt: new Date(Date.now() - 7000000), // 2h - 3min
        completedTimeStr: new Date(Date.now() - 7000000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        advisorId: 1,
        isPriority: false,
        waitingTime: 2, // 20 segundos en minutos
        attentionTime: 5 // 3 minutos
      },
      {
        id: 12,
        turnNumber: 'B012',
        turnCode: 'B012',
        module: 'Módulo 2',
        service: 'Pagos',
        userIdentification: '77889900',
        status: 'COMPLETED',
        date: today,
        createdAt: new Date(Date.now() - 6000000), // 100 minutos antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        calledAt: new Date(Date.now() - 5980000),  // 99.6 minutos antes
        calledTimeStr: new Date(Date.now() - 5980000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        completedAt: new Date(Date.now() - 5800000),
        completedTimeStr: new Date(Date.now() - 5800000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        advisorId: 2,
        isPriority: true,
        priorityDetails: 'Adulto mayor',
        waitingTime: 3, // 20 segundos en minutos
        attentionTime: 7 // 3 minutos
      },
      {
        id: 13,
        turnNumber: 'C013',
        turnCode: 'C013',
        module: 'Módulo 3',
        service: 'Reclamos',
        userIdentification: '11223355',
        status: 'COMPLETED',
        date: today,
        createdAt: new Date(Date.now() - 5400000), // 90 minutos antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        calledAt: new Date(Date.now() - 5380000),  // 89.6 minutos antes
        calledTimeStr: new Date(Date.now() - 5380000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        completedAt: new Date(Date.now() - 5200000), // 86.6 minutos antes
        completedTimeStr: new Date(Date.now() - 5200000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        advisorId: 3,
        isPriority: false,
        waitingTime: 9, // 20 segundos en minutos
        attentionTime: 11 // 3 minutos
      },
      {
        id: 14,
        turnNumber: 'A014',
        turnCode: 'A014',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '99887755',
        status: 'COMPLETED',
        date: today,
        createdAt: new Date(Date.now() - 4800000), // 80 minutos antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        calledAt: new Date(Date.now() - 4780000),  // 79.6 minutos antes
        calledTimeStr: new Date(Date.now() - 4780000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        completedAt: new Date(Date.now() - 4600000), // 76.6 minutos antes
        completedTimeStr: new Date(Date.now() - 4600000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        advisorId: 1,
        isPriority: true,
        priorityDetails: 'Embarazada',
        waitingTime: 5, // 20 segundos en minutos
        attentionTime: 10 // 3 minutos
      },
      {
        id: 15,
        turnNumber: 'B015',
        turnCode: 'B015',
        module: 'Módulo 2',
        service: 'Pagos',
        userIdentification: '44556688',
        status: 'COMPLETED',
        date: today,
        createdAt: new Date(Date.now() - 3600000), // 60 minutos antes
        createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        calledAt: new Date(Date.now() - 3580000),  // 59.6 minutos antes
        calledTimeStr: new Date(Date.now() - 3580000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        completedAt: new Date(Date.now() - 3400000), // 56.6 minutos antes
        completedTimeStr: new Date(Date.now() - 3400000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        advisorId: 2,
        isPriority: false,
        waitingTime: 5, // 20 segundos en minutos
        attentionTime: 7 // 3 minutos
      }
    ]);

    this.updateCalledTurns();
    this.updateCalledTurnsSignal();
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

  getCalledTurnsSignal = computed(() => this.calledTurnsSignal());

  
  private updateCalledTurnsSignal() {
    // Filtra los turnos con estado 'CALLED' y actualiza el Signal llamado `calledTurns`
    const calledTurns = this.turns.value.filter(t => t.status === 'CALLED');
    this.calledTurnsSignal.set(calledTurns);
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
      date: this.getDateWithoutTime(new Date()),
      createdAt: new Date(),
      createdTimeStr: new Date(Date.now() - 7180000).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
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
      const now = new Date();
      const createdAt = new Date(currentTurns[turnIndex].createdAt);
      const waitingTime = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60));
      
      // Formatear la hora actual como string HH:mm
      const calledTimeStr = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      // Actualizar el estado del turno a "en atención"
      currentTurns[turnIndex] = {
        ...currentTurns[turnIndex],
        status: 'CALLED',
        module,
        advisorId,
        calledAt: now,
        calledTimeStr: calledTimeStr,
        waitingTime: waitingTime
      };
      
      this.turns.next(currentTurns);
      this.updateCalledTurns();
      this.updateCalledTurnsSignal();
      this.updateAttentionTurns();
    }
  }

  finishAttention(turnId: number) {
    const currentTurns = this.turns.value;
    const turnIndex = currentTurns.findIndex(t => t.id === turnId);
    
    if (turnIndex !== -1) {
      const now = new Date();
      const calledAt = new Date(currentTurns[turnIndex].calledAt!);
      const attentionTime = Math.floor((now.getTime() - calledAt.getTime()) / (1000 * 60));

      // Formatear la hora actual como string HH:mm
      const completedTimeStr = now.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      // Actualizar el estado del turno a "completado"
      currentTurns[turnIndex] = {
        ...currentTurns[turnIndex],
        status: 'COMPLETED',
        completedAt: now,
        completedTimeStr: completedTimeStr,
        attentionTime: attentionTime
      };
      
      this.turns.next(currentTurns);
      this.updateCalledTurns();
      this.updateCalledTurnsSignal();
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
        
        const turnDate = new Date(turn.date);
        return turnDate.getFullYear() === date.getFullYear() &&
               turnDate.getMonth() === date.getMonth() &&
               turnDate.getDate() === date.getDate();
      }))
    );
  }

  private getDateWithoutTime(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }
}
