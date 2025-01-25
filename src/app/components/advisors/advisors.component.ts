import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advisors',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">Gestión de Asesores</h2>
      <div class="bg-white rounded-lg shadow p-6">
        <p>Contenido del componente de asesores</p>
      </div>
    </div>
  `
})
export class AdvisorsComponent {} 