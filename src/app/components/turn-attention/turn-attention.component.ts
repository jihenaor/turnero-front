import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Turn } from '../../models/turn.model';
import { ServiceService } from '../../services/services.service';
import { interval, Subscription } from 'rxjs';
import { TurnAttention } from '../../models/turn-attention.model';
import { AttentionService } from '../../services/attention.service';

@Component({
  selector: 'app-turn-attention',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './turn-attention.component.html'
})
export class TurnAttentionComponent implements OnInit, OnDestroy {
  @Input() turn!: Turn;
  @Output() close = new EventEmitter<void>();

  selectedServiceId?: number;
  attentionForm: FormGroup;
  formSubmitted = false;

  // Constantes para el timer
  readonly ATTENTION_LIMIT_MINUTES = 15;
  readonly WARNING_THRESHOLD = 0.8;

  // Variables para el timer
  attentionTimer: Subscription | null = null;
  currentAttentionTime = 0;
  showTimeWarning = false;

  constructor(
    private fb: FormBuilder,
    public serviceService: ServiceService,
    private attentionService: AttentionService
  ) {
    this.attentionForm = this.fb.group({
      identification: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      accountNumber: ['', [
        Validators.minLength(5),
        Validators.maxLength(20)
      ]],
      clientphone: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^[0-9]+$/)
      ]],
      clientemail: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]],
      service: ['', [
        Validators.required
      ]],
      problem: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],
      solution: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],
      comments: ['', [
        Validators.maxLength(200)
      ]]
    });
  }

  ngOnInit() {
    this.loadServices();
    this.attentionForm.patchValue({
      identification: this.turn.userIdentification,
      service: this.turn.serviceId
    });
    this.startAttentionTimer();

    // Para depuración
    this.attentionForm.statusChanges.subscribe(status => {
      console.log('Estado del formulario:', status);
      console.log('Errores del formulario:', this.attentionForm.errors);
      console.log('Valores del formulario:', this.attentionForm.value);
      // Agregar esta parte para depuración
      Object.keys(this.attentionForm.controls).forEach(key => {
        const control = this.attentionForm.get(key);
        if (control?.errors) {
          console.log(`Errores en ${key}:`, control.errors);
        }
      });
    });
  }

  ngOnDestroy() {
    this.stopAttentionTimer();
  }

  // Métodos del timer
  startAttentionTimer() {
    this.currentAttentionTime = 0;
    this.attentionTimer = interval(1000).subscribe(() => {
      this.currentAttentionTime++;
      this.checkTimeLimit();
    });
  }

  stopAttentionTimer() {
    if (this.attentionTimer) {
      this.attentionTimer.unsubscribe();
      this.attentionTimer = null;
    }
  }

  checkTimeLimit() {
    const timeInMinutes = this.currentAttentionTime / 60;
    this.showTimeWarning = timeInMinutes >= (this.ATTENTION_LIMIT_MINUTES * this.WARNING_THRESHOLD);
  }

  getTimeDisplay(): string {
    const minutes = Math.floor(this.currentAttentionTime / 60);
    const seconds = this.currentAttentionTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getRemainingTime(): number {
    return this.ATTENTION_LIMIT_MINUTES - (this.currentAttentionTime / 60);
  }

  // Métodos existentes
  loadServices() {
    this.serviceService.getServices();
  }

  get identificationInvalid() {
    const control = this.attentionForm.get('identification');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get celularInvalido() {
    const control = this.attentionForm.get('celular');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get correoInvalido() {
    const control = this.attentionForm.get('correo');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get problemInvalid() {
    const control = this.attentionForm.get('problem');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get solutionInvalid() {
    const control = this.attentionForm.get('solution');
    return control?.invalid && (control?.dirty || control?.touched);
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.attentionForm.valid) {
      const attentionData: TurnAttention = {
        ...this.attentionForm.value,
        id: this.turn.id,
        serviceId: this.turn.serviceId
      };

      this.attentionService.registerAttention(attentionData)
        .subscribe({
          next: () => {
            this.closeModal();
          },
          error: (error) => {
            console.error('Error al registrar la atención:', error);
          }
        });
    } else {
      Object.keys(this.attentionForm.controls).forEach(key => {
        const control = this.attentionForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  closeModal() {
    this.close.emit();
  }

  // Método auxiliar para verificar la validez de cada campo
  getFieldErrors(fieldName: string): string[] {
    const control = this.attentionForm.get(fieldName);
    if (control && control.errors && (control.dirty || control.touched)) {
      return Object.keys(control.errors);
    }
    return [];
  }

  // Mensajes de error personalizados
  getErrorMessage(fieldName: string): string {
    const control = this.attentionForm.get(fieldName);
    if (control?.errors) {
      if (control.errors['required']) return 'Este campo es obligatorio';
      if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['maxlength']) return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      if (control.errors['email']) return 'Correo electrónico inválido';
      if (control.errors['pattern']) return 'Solo se permiten números';
    }
    return '';
  }
}
