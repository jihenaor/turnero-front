import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-pending-turns',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Mis Turnos en Espera</h2>
      <div class="bg-white rounded-lg shadow p-6">
        <p>Lista de mis turnos pendientes</p>
      </div>
    </div>
  `
})
export class MyPendingTurnsComponent {} 