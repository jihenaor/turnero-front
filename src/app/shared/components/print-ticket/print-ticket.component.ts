import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PrintTicketComponent {
  @Input() turn: any;
  companyConfig: any;
  logoPath: string = 'assets/images/serviciudad-logo.png';

  constructor(private configService: ConfigService) {
    this.companyConfig = this.configService.getCompanyConfig();
  }
} 