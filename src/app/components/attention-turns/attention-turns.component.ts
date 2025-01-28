import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../models/turn.model';
import { TurnService } from '../../services/turn.service';
import { AdvisorService, Advisor, Attention } from '../../services/advisor.service';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-attention-turns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attention-turns.component.html'
})
export class AttentionTurnsComponent implements OnInit {
  attentionTurns: {
    turn: Turn;
    advisor: Advisor;
    attention: Attention;
    elapsedTime: number;
  }[] = [];

  constructor(
    private turnService: TurnService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit() {
    this.loadAttentionTurns();
    // Actualizar el tiempo transcurrido cada minuto
    interval(60000).subscribe(() => {
      this.updateElapsedTimes();
    });
  }

  loadAttentionTurns() {
    this.advisorService.getAdvisors().subscribe(advisors => {
      this.attentionTurns = [];
      
      advisors.forEach(advisor => {
        if (advisor.currentAttention) {
          this.turnService.getTurnById(advisor.currentAttention.turnId).subscribe(turn => {
            if (turn) {
              this.attentionTurns.push({
                turn,
                advisor,
                attention: advisor.currentAttention!,
                elapsedTime: this.calculateElapsedTime(advisor.currentAttention!.startTime)
              });
            }
          });
        }
      });
    });
  }

  private updateElapsedTimes() {
    this.attentionTurns = this.attentionTurns.map(item => ({
      ...item,
      elapsedTime: this.calculateElapsedTime(item.attention.startTime)
    }));
  }

  private calculateElapsedTime(startTime: Date): number {
    return Math.floor((new Date().getTime() - new Date(startTime).getTime()) / 60000);
  }

  getTimeClass(elapsedTime: number): string {
    if (elapsedTime < 15) return 'text-green-600';
    if (elapsedTime < 30) return 'text-yellow-600';
    return 'text-red-600';
  }
} 