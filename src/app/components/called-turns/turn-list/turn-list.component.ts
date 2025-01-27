import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../../models/turn.model';

@Component({
  selector: 'app-turn-list',
  templateUrl: './turn-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class TurnListComponent implements OnInit {
  @Input() calledTurns: Turn[] = [];
  logoPath: string = 'assets/images/serviciudad-logo.png';

  ngOnInit() {
    // Datos de prueba
    this.calledTurns = [
      {
        id: 1,
        turnNumber: 'A001',
        turnCode: 'A001',
        module: 'Módulo 1',
        service: 'Atención al Cliente',
        userIdentification: '1234567890',
        status: 'CALLED',
        createdAt: new Date()
      },
      {
        id: 2,
        turnNumber: 'B015',
        turnCode: 'B015',
        module: 'Módulo 2',
        service: 'Pagos',
        userIdentification: '0987654321',
        status: 'CALLED',
        createdAt: new Date()
      },
      {
        id: 3,
        turnNumber: 'C023',
        turnCode: 'C023',
        module: 'Módulo 3',
        service: 'Reclamos',
        userIdentification: '5555555555',
        status: 'CALLED',
        createdAt: new Date()
      }
    ];
  }
} 