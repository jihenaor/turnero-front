import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../models/turn.model';
import { TurnService } from '../../services/turn.service';
import { AdvisorService, Advisor, Attention } from '../../services/advisor.service';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-attention-turns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attention-turns.component.html'
})
export class AttentionTurnsComponent implements OnInit, OnDestroy {
  readonly ATTENTION_LIMIT_MINUTES = 15; // Tiempo límite de atención
  readonly WARNING_THRESHOLD = 0.8; // Mostrar alarma cuando alcance 80% del tiempo

  attentionTurns: {
    turn: Turn;
    advisor: Advisor;
    attention: Attention;
    elapsedTime: number;
  }[] = [];

  attentionTimer: Subscription | null = null;
  currentAttentionTime = 0;
  showTimeWarning = false;

  constructor(
    private turnService: TurnService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit() {
    this.loadAttentionTurns();
    this.startAttentionTimer();
  }

  ngOnDestroy() {
    this.stopAttentionTimer();
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

  startAttentionTimer() {
    this.currentAttentionTime = 0;
    this.attentionTimer = interval(1000).subscribe(() => {
      this.currentAttentionTime++;
      this.checkTimeLimit();
    });
  }

  stopAttentionTimer() {
    if (this.attentionTimer) {
      this.attentionTimer.unsubscribe();
      this.attentionTimer = null;
    }
  }

  checkTimeLimit() {
    const timeInMinutes = this.currentAttentionTime / 60;
    this.showTimeWarning = timeInMinutes >= (this.ATTENTION_LIMIT_MINUTES * this.WARNING_THRESHOLD);
  }

  getTimeDisplay(): string {
    const minutes = Math.floor(this.currentAttentionTime / 60);
    const seconds = this.currentAttentionTime % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  getRemainingTime(): number {
    return this.ATTENTION_LIMIT_MINUTES - (this.currentAttentionTime / 60);
  }
}
