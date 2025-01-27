import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../models/turn.model';


interface ServiceSummary {
  service: string;
  count: number;
  averageTime: number;
}

@Component({
  selector: 'app-completed-turns-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './completed-turns-summary.component.html'
})
export class CompletedTurnsSummaryComponent implements OnChanges {
  @Input() turns: Turn[] = [];
  summaryData: ServiceSummary[] = [];
  totalTurns: number = 0;
  totalAverageTime: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['turns']) {
      this.calculateSummary();
    }
  }

  private calculateSummary() {
    const serviceMap = new Map<string, { total: number, timeSum: number, count: number }>();

    this.turns.forEach(turn => {
      const endTime = turn.completedAt ? new Date(turn.completedAt) : new Date();
      const startTime = new Date(turn.calledAt || turn.createdAt);
      const attentionTime = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));

      const serviceData = serviceMap.get(turn.service) || { total: 0, timeSum: 0, count: 0 };
      serviceData.total += 1;
      serviceData.timeSum += attentionTime;
      serviceData.count += 1;
      serviceMap.set(turn.service, serviceData);
    });

    this.summaryData = Array.from(serviceMap.entries()).map(([service, data]) => ({
      service,
      count: data.total,
      averageTime: Math.round(data.timeSum / data.count)
    }));

    this.totalTurns = this.summaryData.reduce((acc, curr) => acc + curr.count, 0);
    
    const totalTime = this.summaryData.reduce((acc, curr) => acc + (curr.averageTime * curr.count), 0);
    this.totalAverageTime = this.totalTurns > 0 ? Number((totalTime / this.totalTurns).toFixed(1)) : 0;
  }
} 