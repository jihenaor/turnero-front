import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private services = new BehaviorSubject<Service[]>([
    {
      id: 1,
      name: 'Atención al Cliente',
      description: 'Atención personalizada y consultas generales',
      isActive: true,
      estimatedTime: 15,
      advisorIds: [1, 2],
      createdAt: new Date(),
      icon: 'M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
    },
    {
      id: 2,
      name: 'Pagos',
      description: 'Gestión de pagos y transacciones',
      isActive: true,
      estimatedTime: 10,
      advisorIds: [2, 3],
      createdAt: new Date(),
      icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
    },
    {
      id: 3,
      name: 'Reclamos',
      description: 'Atención de reclamos y sugerencias',
      isActive: true,
      estimatedTime: 20,
      advisorIds: [1, 3],
      createdAt: new Date(),
      icon: 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
    },
    {
      id: 4,
      name: 'Información General',
      description: 'Información y orientación general',
      isActive: true,
      estimatedTime: 10,
      advisorIds: [1, 2, 3],
      createdAt: new Date(),
      icon: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
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