import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-survey-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-questions.component.html'
})
export class SurveyQuestionsComponent {
  questions = [
    {
      id: 1,
      text: '¿Cómo calificaría la atención recibida?',
      type: 'rating'
    },
    {
      id: 2,
      text: '¿El tiempo de espera fue adecuado?',
      type: 'rating'
    },
    {
      id: 3,
      text: '¿El asesor resolvió su consulta satisfactoriamente?',
      type: 'rating'
    },
    {
      id: 4,
      text: 'Comentarios adicionales',
      type: 'text'
    }
  ];
} 