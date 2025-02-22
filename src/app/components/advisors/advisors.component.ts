import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdvisorService, Advisor } from '../../services/advisor.service';
import { ServiceService } from '../../services/services.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-advisors',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './advisors.component.html'
})
export class AdvisorsComponent implements OnInit {
  advisors: Advisor[] = [];
  advisorForm: FormGroup;
  showForm = false;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private advisorService: AdvisorService,
    public serviceService: ServiceService
  ) {
    this.advisorForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      isAvailable: [true],
      serviceIds: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.loadAdvisors();
    this.loadServices();
  }

  loadAdvisors() {
    this.advisorService.getAdvisors().subscribe(advisors => {
      this.advisors = advisors;
    });
  }

  loadServices() {
    this.serviceService.getServices();
  }

  onSubmit() {
    if (this.advisorForm.valid) {
      const advisorData = this.advisorForm.value;

      if (this.isEditing) {
        this.advisorService.updateAdvisor(advisorData).subscribe(() => {
          this.resetForm();
          this.loadAdvisors();
        });
      } else {
        this.advisorService.createAdvisor(advisorData).subscribe(() => {
          this.resetForm();
          this.loadAdvisors();
        });
      }
    }
  }

  editAdvisor(advisor: Advisor) {
    this.isEditing = true;
    this.showForm = true;
    this.advisorForm.patchValue({
      ...advisor,
      serviceIds: this.getAdvisorServices(advisor)
    });
  }

  toggleAdvisorStatus(advisor: Advisor) {
    const updatedAdvisor = {
      ...advisor,
      isAvailable: !advisor.isAvailable
    };

    this.advisorService.updateAdvisor(updatedAdvisor).subscribe(() => {
      this.loadAdvisors();
    });
  }

  resetForm() {
    this.isEditing = false;
    this.showForm = false;
    this.advisorForm.reset({
      isAvailable: true,
      serviceIds: []
    });
  }

  getAdvisorServices(advisor: Advisor): number[] {
    return this.serviceService.services()
      .filter(service => service.advisorIds.includes(advisor.id))
      .map(service => service.id!)
      .filter(id => id !== undefined);
  }

  getAssignedServices(advisor: Advisor): string {
    return this.serviceService.services()
      .filter(service => service.advisorIds.includes(advisor.id))
      .map(service => service.name)
      .join(', ') || 'Ninguno';
  }
}
