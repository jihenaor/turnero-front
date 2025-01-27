import { Injectable } from '@angular/core';

export interface CompanyConfig {
  companyName: string;
  logoPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private companyConfig: CompanyConfig = {
    companyName: 'Serviciudad',
    logoPath: 'assets/images/serviciudad-logo.png'
  };

  getCompanyConfig(): CompanyConfig {
    return this.companyConfig;
  }
} 