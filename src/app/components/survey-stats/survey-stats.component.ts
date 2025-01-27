import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisfactionSurveyService } from '../../services/satisfaction-survey.service';

@Component({
  selector: 'app-survey-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-stats.component.html'
})
export class SurveyStatsComponent {
  averageRating: number = 0;
  totalSurveys: number = 0;

  constructor(private surveyService: SatisfactionSurveyService) {
    this.averageRating = this.surveyService.getAverageRating();
    this.surveyService.getSurveys().subscribe(surveys => {
      this.totalSurveys = surveys.length;
    });
  }
} 