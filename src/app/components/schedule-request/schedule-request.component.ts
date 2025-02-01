import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';
import { LogoHeaderComponent } from '../shared/logo-header/logo-header.component';

interface AvailableTime {
  hour: string;
  available: boolean;
}

interface AvailableDay {
  date: Date;
  times: AvailableTime[];
}

@Component({
  selector: 'app-schedule-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LogoHeaderComponent
  ],
  templateUrl: './schedule-request.component.html'
})
export class ScheduleRequestComponent implements OnInit {
  scheduleForm: FormGroup;
  services: Service[] = [];
  termsAccepted = false;
  availableSlots: Date[] = [];  // Aquí irían las fechas y horas disponibles
  selectedDay: AvailableDay | null = null;
  selectedTime: AvailableTime | null = null;

  businessHours = {
    start: '08:00',
    end: '17:00',
    interval: 30  // minutos
  };

  workDays = [1, 2, 3, 4, 5];  // Lunes a Viernes
  availableDays: AvailableDay[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService
  ) {
    this.scheduleForm = this.fb.group({
      serviceId: ['', Validators.required],
      identification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      accountNumber: ['', Validators.required],
      phone: ['', Validators.required],
      consultationReason: ['', Validators.required],
      scheduledDateTime: ['', Validators.required],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.loadSchedulableServices();
    this.generateAvailableDays();
  }

  loadSchedulableServices() {
    this.serviceService.getServices().subscribe({
      next: (services) => {
        this.services = services.filter(service => service.schedulable);
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
      }
    });
  }

  onSubmit() {
    if (this.scheduleForm.valid) {
      console.log('Formulario enviado:', this.scheduleForm.value);
      // Aquí iría la lógica para crear el turno agendado
    }
  }

  loadAvailableSlots() {
    // Aquí iría la lógica para cargar slots disponibles según el servicio seleccionado
  }

  generateAvailableDays() {
    const today = new Date();
    this.availableDays = [];

    // Generar días disponibles para las próximas 2 semanas
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Solo incluir días laborables
      if (this.workDays.includes(date.getDay())) {
        this.availableDays.push({
          date: date,
          times: this.generateTimesForDay()
        });
      }
    }
  }

  generateTimesForDay(): AvailableTime[] {
    const times: AvailableTime[] = [];
    const [startHour, startMinute] = this.businessHours.start.split(':').map(Number);
    const [endHour, endMinute] = this.businessHours.end.split(':').map(Number);

    let currentDate = new Date();
    currentDate.setHours(startHour, startMinute, 0);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0);

    while (currentDate < endDate) {
      times.push({
        hour: currentDate.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        available: true  // Por defecto todas las horas están disponibles
      });

      currentDate.setMinutes(currentDate.getMinutes() + this.businessHours.interval);
    }

    return times;
  }

  selectDay(day: AvailableDay) {
    this.selectedDay = day;
    this.selectedTime = null;
    this.scheduleForm.patchValue({ scheduledDateTime: null });
  }

  selectTime(time: AvailableTime) {
    if (!time.available) return;

    this.selectedTime = time;
    if (this.selectedDay) {
      const dateTime = new Date(this.selectedDay.date);
      const [hours, minutes] = time.hour.split(':').map(Number);
      dateTime.setHours(hours, minutes);
      this.scheduleForm.patchValue({ scheduledDateTime: dateTime });
    }
  }
}
