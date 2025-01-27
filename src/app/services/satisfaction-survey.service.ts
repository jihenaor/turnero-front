import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SatisfactionSurvey } from '../models/satisfaction-survey.model';

@Injectable({
  providedIn: 'root'
})
export class SatisfactionSurveyService {
  private surveys = new BehaviorSubject<SatisfactionSurvey[]>([
    // Datos de prueba
    {
      id: 1,
      turnId: 7,
      advisorId: 1,
      rating: 5,
      comment: "Excelente atención, muy rápido el servicio",
      createdAt: new Date(Date.now() - 3540000),
      service: "Atención al Cliente",
      module: "Módulo 1"
    },
    {
      id: 2,
      turnId: 8,
      advisorId: 1,
      rating: 4,
      comment: "Buen servicio pero un poco de demora",
      createdAt: new Date(Date.now() - 7140000),
      service: "Pagos",
      module: "Módulo 2"
    },
    {
      id: 3,
      turnId: 9,
      advisorId: 1,
      rating: 5,
      comment: "Muy buena atención del asesor",
      createdAt: new Date(Date.now() - 1740000),
      service: "Reclamos",
      module: "Módulo 1"
    }
  ]);

  getSurveys(): Observable<SatisfactionSurvey[]> {
    return this.surveys.asObservable();
  }

  getSurveysByAdvisor(advisorId: number): Observable<SatisfactionSurvey[]> {
    return new Observable(subscriber => {
      subscriber.next(this.surveys.value.filter(s => s.advisorId === advisorId));
    });
  }

  getAverageRating(advisorId?: number): number {
    const surveys = advisorId 
      ? this.surveys.value.filter(s => s.advisorId === advisorId)
      : this.surveys.value;
    
    return surveys.reduce((acc, curr) => acc + curr.rating, 0) / surveys.length;
  }
} 