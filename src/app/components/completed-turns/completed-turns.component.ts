import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Turn } from '../../models/turn.model';
import { TurnService } from '../../services/turn.service';
import { AdvisorService, Advisor } from '../../services/advisor.service';
import { ServiceService } from '../../services/services.service';
import { Service } from '../../models/service.model';

@Component({
  selector: 'app-completed-turns',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './completed-turns.component.html'
})
export class CompletedTurnsComponent implements OnInit {
  completedTurns: Turn[] = [];
  filteredTurns: Turn[] = [];
  advisors: Advisor[] = [];
  filterForm: FormGroup;

  summary = {
    total: 0,
    priority: 0,
    averageWaitTime: 0,    // Tiempo promedio de espera
    averageAttentionTime: 0, // Tiempo promedio de atención
    byAdvisor: new Map<number, number>(),
    byService: new Map<string, number>()
  };

  constructor(
    private fb: FormBuilder,
    private turnService: TurnService,
    private advisorService: AdvisorService,
    public serviceService: ServiceService
  ) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
                        .toISOString().split('T')[0];

    this.filterForm = this.fb.group({
      date: [localDate],
      advisorId: [''],
      serviceId: ['']
    });
  }

  ngOnInit() {
    this.loadData();
    this.setupFilterSubscription();
  }

  private loadData() {
    this.advisorService.getAdvisors().subscribe(advisors => {
      this.advisors = advisors;
    });

    this.serviceService.getServices();

    this.loadCompletedTurns();
  }

  private setupFilterSubscription() {
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  loadCompletedTurns() {
    const filterDate = new Date(this.filterForm.get('date')?.value + 'T00:00:00');

    this.turnService.getCompletedTurnsByDate(filterDate)
      .subscribe(turns => {
        this.completedTurns = turns;
        this.applyFilters();
      });
  }

  private applyFilters() {
    let filtered = [...this.completedTurns];
    const filters = this.filterForm.value;

    if (filters.advisorId) {
      filtered = filtered.filter(turn => turn.advisorId === parseInt(filters.advisorId));
    }

    if (filters.serviceId) {
      filtered = filtered.filter(turn => turn.service === filters.serviceId);
    }

    this.filteredTurns = filtered;
    this.updateSummary();
  }

  private updateSummary() {
    this.summary.total = this.filteredTurns.length;
    this.summary.priority = this.filteredTurns.filter(t => t.isPriority).length;

    // Calcular tiempo promedio de espera
    const totalWaitTime = this.filteredTurns.reduce((acc, turn) =>
      acc + (turn.waitingTime || 0), 0);

    // Calcular tiempo promedio de atención
    const totalAttentionTime = this.filteredTurns.reduce((acc, turn) =>
      acc + (turn.attentionTime || 0), 0);

    this.summary.averageWaitTime = this.filteredTurns.length > 0
      ? Math.round(totalWaitTime / this.filteredTurns.length)
      : 0;

    this.summary.averageAttentionTime = this.filteredTurns.length > 0
      ? Math.round(totalAttentionTime / this.filteredTurns.length)
      : 0;

    // Resumen por asesor
    this.summary.byAdvisor = new Map();
    this.filteredTurns.forEach(turn => {
      if (turn.advisorId) {
        const current = this.summary.byAdvisor.get(turn.advisorId) || 0;
        this.summary.byAdvisor.set(turn.advisorId, current + 1);
      }
    });

    // Resumen por servicio
    this.summary.byService = new Map();
    this.filteredTurns.forEach(turn => {
      const current = this.summary.byService.get(turn.service) || 0;
      this.summary.byService.set(turn.service, current + 1);
    });
  }


  getAdvisorName(advisorId: number): string {
    return this.advisors.find(a => a.id === advisorId)?.name || 'N/A';
  }

  onDateChange() {
    this.loadCompletedTurns();
  }
}
