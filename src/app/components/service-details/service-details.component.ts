import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../models/turn.model';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Detalles del Servicio</h2>
          <button (click)="close.emit()" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Turno</label>
            <p class="mt-1 text-lg">{{ turn.turnNumber }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Servicio</label>
            <p class="mt-1 text-lg">{{ turn.service }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Módulo</label>
            <p class="mt-1 text-lg">{{ turn.module }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Estado</label>
            <p class="mt-1 text-lg">{{ turn.status }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Hora de Creación</label>
            <p class="mt-1 text-lg">{{ turn.createdTimeStr }}</p>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button (click)="close.emit()"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  `
})
export class ServiceDetailsComponent {
  @Input() turn!: Turn;
  @Output() close = new EventEmitter<void>();
}
