import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Turn {
  id: string;
  service: string;
  userIdentification: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private currentTurn = new BehaviorSubject<Turn | null>(null);
  currentTurn$ = this.currentTurn.asObservable();

  private availableServices = [
    { id: 1, name: 'Atención al Cliente' },
    { id: 2, name: 'Pagos' },
    { id: 3, name: 'Reclamos' },
    { id: 4, name: 'Información General' }
  ];

  private turnQueue: Turn[] = [];

  constructor() { }

  getServices() {
    return this.availableServices;
  }

  generateTurn(service: string, userIdentification: string): Turn {
    const turn: Turn = {
      id: this.generateTurnId(),
      service,
      userIdentification,
      date: new Date()
    };
    this.turnQueue.push(turn);
    this.currentTurn.next(turn);
    return turn;
  }

  private generateTurnId(): string {
    return `T${Math.floor(Math.random() * 1000)}`;
  }

  getNextTurn(): Turn | null {
    return this.turnQueue.shift() || null;
  }

  getTurnQueueLength(): number {
    return this.turnQueue.length;
  }
}
