import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintService } from '../../services/print.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-turn-display',
  templateUrl: './turn-display.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class TurnDisplayComponent implements OnInit {
  @Input() turn: any;
  @Output() close = new EventEmitter<void>();
  companyConfig: any;
  logoPath: string = 'assets/images/serviciudad-logo.png';

  constructor(
    private printService: PrintService,
    private configService: ConfigService 
  ) {}

  ngOnInit() {
    this.companyConfig = this.configService.getCompanyConfig();

    setTimeout(() => {
      this.printService.printTurn(this.turn, this.companyConfig);

      setTimeout(() => {
        this.closeComponent();
      }, 1000);
    }, 6000);
  }

  private closeComponent(): void {
    this.close.emit();
  }
}
