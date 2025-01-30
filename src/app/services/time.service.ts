import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  
  /**
   * Calcula el tiempo de espera en minutos desde una hora dada en formato HH:MM hasta ahora
   * @param timeStr Hora en formato HH:MM
   * @returns número de minutos transcurridos
   */
  calculateWaitingTime(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const createdDate = new Date();
    createdDate.setHours(hours, minutes, 0, 0);
    
    return Math.floor((new Date().getTime() - createdDate.getTime()) / 60000);
  }
} 