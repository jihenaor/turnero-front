import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Evaluación y Seguimiento</h2>
      <div class="bg-white rounded-lg shadow p-6">
        <p>Métricas y evaluación de desempeño</p>
      </div>
    </div>
  `
})
export class EvaluationComponent {} 