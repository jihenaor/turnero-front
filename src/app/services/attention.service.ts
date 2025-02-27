import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TurnAttention } from '../models/turn-attention.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttentionService {
  private apiUrl = `${environment.apiUrl}/turns/register-turn-attended`;

  constructor(private http: HttpClient) {}

  registerAttention(attention: TurnAttention) {
    return this.http.post(this.apiUrl, attention);
  }
}
