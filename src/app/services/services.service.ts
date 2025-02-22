import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private servicesSignal = signal<Service[]>([]);

  constructor(private http: HttpClient) {}

  getServices(): void {
    const url = `${environment.apiUrl}/servicios`;

    this.http.get<Service[]>(url).subscribe({
      next: (services) => {
        this.servicesSignal.set(services);
      }
    });
  }

  get services() {
    return this.servicesSignal.asReadonly();
  }

  createService(service: Service) {
    return this.http.post<Service>(`${environment.apiUrl}/servicios`, service);
  }

  updateService(service: Service) {
    return this.http.put<Service>(`${environment.apiUrl}/servicios/${service.id}`, service);
  }
}
