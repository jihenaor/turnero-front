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
    { id: 1, name: 'Asesor 1', isAvailable: false }, // Iniciamos como no disponible
    { id: 2, name: 'Asesor 2', isAvailable: false },
    { id: 3, name: 'Asesor 3', isAvailable: false }
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
} 