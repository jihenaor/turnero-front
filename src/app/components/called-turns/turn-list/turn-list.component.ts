import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turn } from '../../../models/turn.model';
import { TurnService } from '../../../services/turn.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-turn-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './turn-list.component.html'
})
export class TurnListComponent implements OnInit, OnDestroy {
  calledTurns: Turn[] = [];
  logoPath: string = 'assets/images/serviciudad-logo.png';
  private subscription?: Subscription;

  constructor(private turnService: TurnService) {}

  ngOnInit() {
    this.subscription = this.turnService.getCalledTurns().subscribe(turns => {
      this.calledTurns = turns;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
} 