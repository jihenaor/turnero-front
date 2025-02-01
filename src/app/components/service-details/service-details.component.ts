import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Turn } from '../../models/turn.model';
import { ServiceService } from '../../services/service.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-details.component.html'
})
export class ServiceDetailsComponent implements OnInit {
  @Input() turn!: Turn;
  @Output() close = new EventEmitter<void>();

  services: Service[] = [];
  selectedService: string = '';

  constructor(private serviceService: ServiceService) {}

  ngOnInit() {
    this.loadServices();
    this.selectedService = this.turn.service;
  }

  loadServices() {
    this.serviceService.getServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
      }
    });
  }

  onServiceChange() {
    // Aquí puedes implementar la lógica para actualizar el servicio del turno
    console.log('Nuevo servicio seleccionado:', this.selectedService);
  }
}
