import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services = new BehaviorSubject<Service[]>([
    // Datos de ejemplo
    {
      id: 1,
      name: 'Atención al Cliente',
      description: 'Servicio general de atención al cliente',
      isActive: true,
      estimatedTime: 15,
      advisorIds: [1, 2],
      createdAt: new Date()
    }
  ]);

  getServices(): Observable<Service[]> {
    return this.services.asObservable();
  }

  createService(service: Service): Observable<Service> {
    const newService = {
      ...service,
      id: this.generateId(),
      createdAt: new Date()
    };
    
    const currentServices = [...this.services.value, newService];
    this.services.next(currentServices);
    
    return of(newService);
  }

  updateService(service: Service): Observable<Service> {
    const currentServices = this.services.value;
    const index = currentServices.findIndex(s => s.id === service.id);
    
    if (index !== -1) {
      const updatedService = {
        ...service,
        updatedAt: new Date()
      };
      currentServices[index] = updatedService;
      this.services.next(currentServices);
      return of(updatedService);
    }
    
    throw new Error('Servicio no encontrado');
  }

  private generateId(): number {
    const currentServices = this.services.value;
    return currentServices.length > 0 
      ? Math.max(...currentServices.map(s => s.id ?? 0)) + 1 
      : 1;
  }
} 