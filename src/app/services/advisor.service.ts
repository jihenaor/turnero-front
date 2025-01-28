import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Turn } from '../models/turn.model';


export interface Attention {
  turnId: number;
  advisorId: number;
  startTime: Date;
  endTime?: Date;
  totalTime?: number; // en minutos
  clientId: string;
}

export interface Advisor {
  id: number;
  name: string;
  isAvailable: boolean;
  currentAttention?: Attention;
  nextAttention?: Attention;
}

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {
  private advisors: Advisor[] = [
    { 
      id: 1, 
      name: 'Asesor 1', 
      isAvailable: false,
      currentAttention: {
        turnId: 10,
        advisorId: 1,
        startTime: new Date(Date.now() - 300000), // 5 minutos antes
        clientId: '44556677'
      }
    },
    { 
      id: 2, 
      name: 'Asesor 2', 
      isAvailable: false,
      currentAttention: {
        turnId: 8,
        advisorId: 2,
        startTime: new Date(Date.now() - 900000), // 15 minutos antes
        clientId: '98765432'
      }
    },
    { 
      id: 3, 
      name: 'Asesor 3', 
      isAvailable: false,
      currentAttention: {
        turnId: 9,
        advisorId: 3,
        startTime: new Date(Date.now() - 600000), // 10 minutos antes
        clientId: '11223344'
      }
    }
  ];

  private attentionHistory: Attention[] = [];
  private currentAdvisor = new BehaviorSubject<Advisor | null>(null);
  currentAdvisor$ = this.currentAdvisor.asObservable();

  setCurrentAdvisor(advisorId: number) {
    const advisor = this.advisors.find(a => a.id === advisorId);
    if (advisor) {
      advisor.isAvailable = false; // El asesor comienza ocupado
      this.currentAdvisor.next(advisor);
    }
  }

  finishAttention(advisorId: number): { completedAttention: Attention, nextAttention: Attention | null } | null {
    const advisor = this.advisors.find(a => a.id === advisorId);
    if (!advisor || !advisor.currentAttention) return null;

    const endTime = new Date();
    const completedAttention: Attention = {
      ...advisor.currentAttention,
      endTime,
      totalTime: this.calculateTotalTime(advisor.currentAttention.startTime, endTime)
    };

    this.attentionHistory.push(completedAttention);
    
    // Limpiar la atención actual
    advisor.currentAttention = undefined;
    
    // Asignar siguiente atención si existe
    let nextAttention = null;
    if (advisor.nextAttention) {
      advisor.currentAttention = advisor.nextAttention;
      advisor.nextAttention = undefined;
      advisor.isAvailable = false;
      nextAttention = advisor.currentAttention;
    } else {
      advisor.isAvailable = true;
    }

    this.currentAdvisor.next(advisor);
    return { completedAttention, nextAttention };
  }

  assignNextClient(advisorId: number, turn: Turn): boolean {
    const advisor = this.advisors.find(a => a.id === advisorId);
    if (!advisor || !turn.id) return false;

    const newAttention: Attention = {
      turnId: turn.id,
      advisorId: advisor.id,
      startTime: new Date(),
      clientId: turn.userIdentification
    };

    if (advisor.currentAttention) {
      advisor.nextAttention = newAttention;
    } else {
      advisor.currentAttention = newAttention;
      advisor.isAvailable = false;
    }

    this.currentAdvisor.next(advisor);
    return true;
  }

  private calculateTotalTime(startTime: Date, endTime: Date): number {
    return Math.round((endTime.getTime() - startTime.getTime()) / 60000);
  }

  getAdvisorById(id: number): Advisor | undefined {
    return this.advisors.find(a => a.id === id);
  }

  getAvailableAdvisors(): Advisor[] {
    return this.advisors.filter(a => a.isAvailable);
  }

  getAdvisors(): Observable<Advisor[]> {
    // Retorna un Observable con la lista de asesores
    return of(this.advisors);
  }

  createAdvisor(advisor: Advisor): Observable<Advisor> {
    const newAdvisor = {
      ...advisor,
      id: this.generateId(),
      currentAttention: undefined,
      nextAttention: undefined
    };
    
    this.advisors.push(newAdvisor);
    return of(newAdvisor);
  }

  updateAdvisor(advisor: Advisor): Observable<Advisor> {
    const index = this.advisors.findIndex(a => a.id === advisor.id);
    
    if (index !== -1) {
      this.advisors[index] = {
        ...this.advisors[index],
        ...advisor
      };
      return of(this.advisors[index]);
    }
    
    throw new Error('Asesor no encontrado');
  }

  private generateId(): number {
    return this.advisors.length > 0 
      ? Math.max(...this.advisors.map(a => a.id)) + 1 
      : 1;
  }
} 