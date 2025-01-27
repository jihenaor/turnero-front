import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Turn } from '../../models/turn.model';

@Component({
  selector: 'app-turn-attention',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './turn-attention.component.html'
})
export class TurnAttentionComponent {
  @Input() turn!: Turn;
  @Output() close = new EventEmitter<void>();
  @Output() finishAttention = new EventEmitter<any>();

  attentionData = {
    identification: '',
    accountNumber: '',
    invoiceNumber: '',
    problem: '',
    comments: '',
    solution: ''
  };

  submitAttention() {
    this.finishAttention.emit({
      turnId: this.turn.id,
      ...this.attentionData
    });
  }

  closeModal() {
    this.close.emit();
  }
} 