import { Injectable, EnvironmentInjector, createComponent, ApplicationRef } from '@angular/core';
import { PrintTicketComponent } from '../shared/components/print-ticket/print-ticket.component';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  constructor(
    private injector: EnvironmentInjector,
    private appRef: ApplicationRef
  ) {}

  printTurn(turn: any) {
    debugger;
    const printContainer = document.createElement('div');
    printContainer.className = 'print-only';

    const componentRef = createComponent(PrintTicketComponent, {
      environmentInjector: this.injector,
      hostElement: printContainer
    });

    componentRef.instance.turn = turn;
    componentRef.instance.companyConfig = {
      companyName: 'Serviciudad',
      logoPath: 'assets/images/serviciudad-logo.png'
    };

    componentRef.changeDetectorRef.detectChanges();

    document.body.appendChild(printContainer);

    setTimeout(() => {
      console.log('Turn data:', componentRef.instance.turn);
      console.log('Company config:', componentRef.instance.companyConfig);

      window.print();
      
      document.body.removeChild(printContainer);
      componentRef.destroy();
    }, 1000);
  }
} 