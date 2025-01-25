import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private companyConfig = {
    name: 'Serviciudad',
    logo: 'assets/images/serviciudad-logo.png',
  };

  getCompanyConfig() {
    return this.companyConfig;
  }
} 