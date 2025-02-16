import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Turn } from '../../models/turn.model';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-turn-attention',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './turn-attention.component.html'
})
export class TurnAttentionComponent implements OnInit, OnDestroy {
  @Input() turn!: Turn;
  @Output() close = new EventEmitter<void>();

  services: Service[] = [];
  selectedServiceId?: number;
  attentionForm: FormGroup;

  // Constantes para el timer
  readonly ATTENTION_LIMIT_MINUTES = 15;
  readonly WARNING_THRESHOLD = 0.8;

  // Variables para el timer
  attentionTimer: Subscription | null = null;
  currentAttentionTime = 0;
  showTimeWarning = false;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService
  ) {
    this.attentionForm = this.fb.group({
      identification: ['', Validators.required],
      accountNumber: [''],
      celular: ['', [Validators.required, Validators.pattern('^3\\d{9}$')]],
      correo: ['', [Validators.required, Validators.email]],
      service: [''],
      problem: ['', Validators.required],
      solution: ['', Validators.required],
      comments: ['']
    });
  }

  ngOnInit() {
    this.loadServices();
    this.attentionForm.patchValue({
      identification: this.turn.userIdentification,
      service: this.turn.serviceId
    });
    this.startAttentionTimer();
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
    this.serviceService.getServices().subscribe(services => {
      this.services = services;
    });
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
    if (this.attentionForm.valid) {
      console.log(this.attentionForm.value);
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }
}
