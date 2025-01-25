import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../services/turn.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-turn-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turn-display.component.html',
  styleUrl: './turn-display.component.css'
})
export class TurnDisplayComponent {
  @Input() turn!: Turn;
  @Output() returnToMenu = new EventEmitter<void>();
  @Output() newTurn = new EventEmitter<void>();
  
  companyConfig;

  constructor(private configService: ConfigService) {
    this.companyConfig = this.configService.getCompanyConfig();
  }

  printAndReturn() {
    window.print();
    setTimeout(() => {
      this.returnToMenu.emit();
    }, 500);
  }
}
