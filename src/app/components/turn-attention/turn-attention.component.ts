import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Turn } from '../../models/turn.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import type { TurnStatus } from '../../models/turn.model';

@Component({
  selector: 'app-turn-attention',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './turn-attention.component.html'
})
export class TurnAttentionComponent {
  @Input() turn!: Turn;
  @Output() close = new EventEmitter<void>();
  @Output() finishAttention = new EventEmitter<Turn>();

  attentionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.attentionForm = this.fb.group({
      identification: ['', Validators.required],
      accountNumber: [''],
      celular: ['', [
        Validators.required,
        Validators.pattern('^[3][0-9]{9}$')
      ]],
      correo: ['', [
        Validators.required,
        Validators.email
      ]],
      problem: ['', Validators.required],
      solution: ['', Validators.required],
      comments: ['']
    });
  }

  ngOnInit() {
    // Inicializar el formulario con los datos existentes del turno
    this.attentionForm.patchValue({
      identification: this.turn.identification || '',
      accountNumber: this.turn.accountNumber || '',
      celular: this.turn.celular || '',
      correo: this.turn.correo || '',
      problem: this.turn.problem || '',
      solution: this.turn.solution || '',
      comments: this.turn.comments || ''
    });
  }

  // Getters para validaciones
  get identificationInvalid() {
    return this.attentionForm.get('identification')?.invalid &&
           this.attentionForm.get('identification')?.touched;
  }

  get problemInvalid() {
    return this.attentionForm.get('problem')?.invalid &&
           this.attentionForm.get('problem')?.touched;
  }

  // Getters para facilitar la validación en el template
  get celularInvalido() {
    return this.attentionForm.get('celular')?.invalid &&
           this.attentionForm.get('celular')?.touched;
  }

  get correoInvalido() {
    return this.attentionForm.get('correo')?.invalid &&
           this.attentionForm.get('correo')?.touched;
  }

  get solutionInvalid() {
    return this.attentionForm.get('solution')?.invalid &&
           this.attentionForm.get('solution')?.touched;
  }

  onSubmit() {
    if (this.attentionForm.valid) {
      const updatedTurn: Turn = {
        ...this.turn,
        status: 'COMPLETED' as TurnStatus,
        ...this.attentionForm.value
      };

      this.finishAttention.emit(updatedTurn);
    }
  }

  closeModal() {
    this.close.emit();
  }
}
