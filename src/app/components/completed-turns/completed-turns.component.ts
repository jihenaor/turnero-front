import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed-turns',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Turnos Atendidos</h2>
      <div class="bg-white rounded-lg shadow p-6">
        <p>Historial de turnos completados</p>
      </div>
    </div>
  `
})
export class CompletedTurnsComponent {} 