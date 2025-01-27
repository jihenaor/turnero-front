import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from '../../models/service.model';
import { ServiceService } from '../../services/service.service';
import { AdvisorService, Advisor } from '../../services/advisor.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  advisors: Advisor[] = [];
  serviceForm: FormGroup;
  isEditing = false;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private advisorService: AdvisorService
  ) {
    this.serviceForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      estimatedTime: [15, [Validators.required, Validators.min(1)]],
      advisorIds: [[], Validators.required],
      isActive: [true]
    });
  }

  ngOnInit() {
    this.loadServices();
    this.loadAdvisors();
  }

  loadServices() {
    this.serviceService.getServices().subscribe(services => {
      this.services = services;
    });
  }

  loadAdvisors() {
    this.advisorService.getAdvisors().subscribe(advisors => {
      this.advisors = advisors;
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const serviceData = this.serviceForm.value;
      
      if (this.isEditing) {
        this.serviceService.updateService(serviceData).subscribe(() => {
          this.resetForm();
          this.loadServices();
        });
      } else {
        this.serviceService.createService(serviceData).subscribe(() => {
          this.resetForm();
          this.loadServices();
        });
      }
    }
  }

  editService(service: Service) {
    this.isEditing = true;
    this.showForm = true;
    this.serviceForm.patchValue(service);
  }

  toggleServiceStatus(service: Service) {
    const updatedService = {
      ...service,
      isActive: !service.isActive
    };
    
    this.serviceService.updateService(updatedService).subscribe(() => {
      this.loadServices();
    });
  }

  resetForm() {
    this.isEditing = false;
    this.showForm = false;
    this.serviceForm.reset({
      isActive: true,
      estimatedTime: 15
    });
  }

  getAssignedAdvisors(service: Service): string {
    return service.advisorIds
      .map(id => this.advisors.find(a => a.id === id)?.name || '')
      .filter(name => name)
      .join(', ') || 'Ninguno';
  }
} 