import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-duplicate-bill',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Duplicado de Factura</h2>
          <button (click)="close.emit()" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Número de Cuenta
            </label>
            <input type="text"
                   [(ngModel)]="accountNumber"
                   class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                   placeholder="Ingrese el número de cuenta">
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <button (click)="close.emit()"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
            Cancelar
          </button>
          <button (click)="printDuplicate()"
                  [disabled]="!accountNumber"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-300">
            Imprimir
          </button>
        </div>
      </div>
    </div>
  `
})
export class DuplicateBillComponent {
  @Output() close = new EventEmitter<void>();
  accountNumber: string = '';

  printDuplicate() {
    if (this.accountNumber) {
      console.log('Imprimiendo duplicado para la cuenta:', this.accountNumber);
      // Aquí iría la lógica para imprimir el duplicado
      this.close.emit();
    }
  }
}
