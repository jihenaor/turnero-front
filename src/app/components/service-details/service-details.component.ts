import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Turn } from '../../models/turn.model';
import { ServiceService } from '../../services/services.service';
import { Service } from '../../models/service.model';
import { TurnService } from '../../services/turn.service';

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-details.component.html'
})
export class ServiceDetailsComponent implements OnInit {
  @Input() turn!: Turn;
  @Output() close = new EventEmitter<void>();

  selectedService: string = '';
  selectedServiceId?: number;

  constructor(
    public serviceService: ServiceService,
    private turnService: TurnService
  ) {}

  ngOnInit() {
    this.loadServices();
    this.selectedService = this.turn.service;
  }

  loadServices() {
    this.serviceService.getServices();
  }

  onServiceChange() {
    const selectedService = this.serviceService.services().find(s => s.name === this.selectedService);

    if (selectedService) {
      this.selectedServiceId = selectedService.id;
    }
  }

  saveChanges() {
    if (this.turn.id && this.selectedServiceId) {
      this.turnService.updateTurnService(this.turn.id, this.selectedServiceId);
      this.close.emit();
    }
  }
}
