import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TurnAttention } from '../models/turn-attention.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttentionService {
  private apiUrl = `${environment.apiUrl}/turns/register-turn-attended`;

  constructor(private http: HttpClient) {}

  registerAttention(attention: TurnAttention): Observable<TurnAttention> {
    return this.http.post<TurnAttention>(this.apiUrl, attention);
  }

  updateAttention(data: TurnAttention): Observable<TurnAttention> {
    return this.http.put<TurnAttention>(`${environment.apiUrl}/atenciones/${data.id}`, data);
  }
}
