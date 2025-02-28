import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Turn } from '../../models/turn.model';
import { ServiceService } from '../../services/services.service';
import { AttentionService } from '../../services/attention.service';
import { TurnAttention } from '../../models/turn-attention.model';

@Component({
  selector: 'app-turn-attention-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './turn-attention-edit.component.html'
})
export class TurnAttentionEditComponent implements OnInit {
  @Input() turn!: Turn;
  @Output() close = new EventEmitter<void>();

  attentionForm: FormGroup;
  formSubmitted = false;
  private initialFormValue: any;

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
      clientPhone: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^[0-9]+$/)
      ]],
      clientMail: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]],
      service: ['', Validators.required],
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

  // Getters para validaciones en el template
  get identificationInvalid(): boolean {
    const control = this.attentionForm.get('identification');
    return Boolean(control?.invalid && (control?.touched || this.formSubmitted));
  }

  get accountNumberInvalid(): boolean {
    const control = this.attentionForm.get('accountNumber');
    return Boolean(control?.invalid && (control?.touched || this.formSubmitted));
  }

  get clientphoneInvalid(): boolean {
    const control = this.attentionForm.get('clientPhone');
    return Boolean(control?.invalid && (control?.touched || this.formSubmitted));
  }

  get clientemailInvalid(): boolean {
    const control = this.attentionForm.get('clientMail');
    return Boolean(control?.invalid && (control?.touched || this.formSubmitted));
  }

  get serviceInvalid(): boolean {
    const control = this.attentionForm.get('service');
    return Boolean(control?.invalid && (control?.touched || this.formSubmitted));
  }

  get problemInvalid(): boolean {
    const control = this.attentionForm.get('problem');
    return Boolean(control?.invalid && (control?.touched || this.formSubmitted));
  }

  get solutionInvalid(): boolean {
    const control = this.attentionForm.get('solution');
    return Boolean(control?.invalid && (control?.touched || this.formSubmitted));
  }

  ngOnInit() {
    console.log('Turn recibido:', this.turn);
    this.loadServices();

    if (this.turn) {
      console.log('Datos a cargar en el formulario:', {
        identification: this.turn.identification,
        accountNumber: this.turn.accountNumber,
        celular: this.turn.clientPhone,
        correo: this.turn.clientMail,
        serviceId: this.turn.serviceId,
        problem: this.turn.problem,
        solution: this.turn.solution,
        comments: this.turn.comments
      });

      this.attentionForm.patchValue({
        identification: this.turn.userIdentification,
        accountNumber: this.turn.accountNumber,
        clientPhone: this.turn.clientPhone,
        clientMail: this.turn.clientMail,
        service: this.turn.serviceId,
        problem: this.turn.problem,
        solution: this.turn.solution,
        comments: this.turn.comments
      });

      console.log('Estado del formulario después de patchValue:', this.attentionForm.value);

      // Guardar el estado inicial del formulario
      this.initialFormValue = this.attentionForm.value;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    // Verificar si el formulario ha sido modificado
    if (JSON.stringify(this.initialFormValue) === JSON.stringify(this.attentionForm.value)) {
      this.close.emit();
    }
  }

  loadServices() {
    this.serviceService.getServices();
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.attentionForm.valid) {
      const updateData: TurnAttention = {
        id: this.turn.id!,
        identification: this.attentionForm.value.identification,
        accountNumber: this.attentionForm.value.accountNumber,
        clientPhone: this.attentionForm.value.clientPhone,
        clientMail: this.attentionForm.value.clientMail,
        serviceId: this.attentionForm.value.service,
        problem: this.attentionForm.value.problem,
        solution: this.attentionForm.value.solution,
        comments: this.attentionForm.value.comments
      };

      this.attentionService.updateAttention(updateData)
        .subscribe({
          next: () => {
            this.closeModal();
          },
          error: (error) => {
            console.error('Error al actualizar la atención:', error);
          }
        });
    }
  }

  closeModal() {
    this.close.emit();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.attentionForm.get(fieldName);
    if (control?.errors && (control?.touched || this.formSubmitted)) {
      if (control.errors['required']) return 'Este campo es obligatorio';
      if (control.errors['minlength'])
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.errors['maxlength'])
        return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      if (control.errors['email']) return 'Correo electrónico inválido';
      if (control.errors['pattern']) return 'Solo se permiten números';
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.attentionForm.get(fieldName);
    return Boolean(control?.invalid && (control?.touched || this.formSubmitted));
  }
}
