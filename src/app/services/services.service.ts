import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Service } from '../models/service.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private services2: Service[] = [
    {
      id: 1,
      name: 'Atención al Cliente',
      letter: 'A',
      description: 'Servicio de atención general al cliente',
      isActive: true,
      schedulable: true,
      estimatedTime: 15,
      advisorIds: [1, 2],
      createdAt: new Date(),
      icon: 'assets/icons/customer-service.svg'
    },
    {
      id: 2,
      name: 'Pagos',
      letter: 'P',
      description: 'Pagos de servicios y facturas',
      isActive: true,
      schedulable: false,
      estimatedTime: 10,
      advisorIds: [2, 3],
      createdAt: new Date(),
      icon: 'assets/icons/payment.svg'
    },
    {
      id: 3,
      name: 'Reclamos',
      letter: 'R',
      description: 'Gestión de reclamos y quejas',
      isActive: true,
      schedulable: true,
      estimatedTime: 20,
      advisorIds: [1, 3],
      createdAt: new Date(),
      icon: 'assets/icons/complaint.svg'
    },
    {
      id: 4,
      name: 'Información General',
      letter: 'I',
      description: 'Información y orientación general',
      isActive: true,
      schedulable: false,
      estimatedTime: 10,
      advisorIds: [1, 2, 3],
      createdAt: new Date(),
      icon: 'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
    }
  ];

  private servicesSubject = new BehaviorSubject<Service[]>(this.services2);
  private servicesSignal = signal<Service[]>([]);

  constructor(private http: HttpClient) {

  }

  getServices(): void {
    console.log('Iniciando petición de servicios...');

    this.http.get<Service[]>('/api/servicios').subscribe({
      next: (services) => {
        console.log('Servicios recibidos:', services);
        this.servicesSignal.set(services);
      },
      error: (error) => {
        console.error('Error al obtener servicios:', error);
        // Si hay error, usar los servicios locales como fallback
        this.servicesSignal.set(this.services2);
      },
      complete: () => {
        console.log('Petición completada');
      }
    });
  }

  get services() {
    return this.servicesSignal.asReadonly();
  }

  createService(service: Service): Observable<Service> {
    const newService = {
      ...service,
      id: this.generateId(),
      createdAt: new Date()
    };

    const currentServices = [...this.servicesSubject.value, newService];
    this.servicesSubject.next(currentServices);

    return of(newService);
  }

  updateService(service: Service): Observable<Service> {
    const currentServices = this.servicesSubject.value;
    const index = currentServices.findIndex(s => s.id === service.id);

    if (index !== -1) {
      const updatedService = {
        ...service,
        updatedAt: new Date()
      };
      currentServices[index] = updatedService;
      this.servicesSubject.next(currentServices);
      return of(updatedService);
    }

    throw new Error('Servicio no encontrado');
  }

  private generateId(): number {
    const currentServices = this.servicesSubject.value;
    return currentServices.length > 0
      ? Math.max(...currentServices.map(s => s.id ?? 0)) + 1
      : 1;
  }
}
