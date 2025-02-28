import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private baseUrl = environment.production ? '/turnero-web' : '';

  getUrl(path: string): string {
    // Asegurarse de que el path comience con /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}${normalizedPath}`;
  }
}
