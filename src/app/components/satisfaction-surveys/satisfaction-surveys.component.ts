import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SatisfactionSurveyService } from '../../services/satisfaction-survey.service';
import { SatisfactionSurvey } from '../../models/satisfaction-survey.model';

@Component({
  selector: 'app-satisfaction-surveys',
  templateUrl: './satisfaction-surveys.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SatisfactionSurveysComponent implements OnInit {
  surveys: SatisfactionSurvey[] = [];
  averageRating: number = 0;

  constructor(private surveyService: SatisfactionSurveyService) {}

  ngOnInit() {
    this.surveyService.getSurveys().subscribe(surveys => {
      this.surveys = surveys;
      this.averageRating = this.surveyService.getAverageRating();
    });
  }
} 