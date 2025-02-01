import { Routes } from '@angular/router';
import { TurnRequestComponent } from './components/turn-request/turn-request.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServicesComponent } from './components/services/services.component';
import { AdvisorsComponent } from './components/advisors/advisors.component';
import { PendingTurnsComponent } from './components/pending-turns/pending-turns.component';
import { CompletedTurnsComponent } from './components/completed-turns/completed-turns.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { MyPendingTurnsComponent } from './components/my-pending-turns/my-pending-turns.component';
import { MyCompletedTurnsComponent } from './components/my-completed-turns/my-completed-turns.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { UserRole } from './models/user.model';
import { CalledTurnsComponent } from './components/called-turns/called-turns.component';
import { SatisfactionSurveysComponent } from './components/satisfaction-surveys/satisfaction-surveys.component';
import { SurveyStatsComponent } from './components/survey-stats/survey-stats.component';
import { SurveyQuestionsComponent } from './components/survey-questions/survey-questions.component';
import { AttentionTurnsComponent } from './components/attention-turns/attention-turns.component';
import { ScheduleRequestComponent } from './components/schedule-request/schedule-request.component';

export const routes: Routes = [
  {
    path: '',
    component: TurnRequestComponent,
    canActivate: [authGuard],
    data: { role: UserRole.CLIENT }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [noAuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'services',
        component: ServicesComponent,
        canActivate: [authGuard],
        data: { role: UserRole.COORDINATOR }
      },
      {
        path: 'advisors',
        component: AdvisorsComponent,
        canActivate: [authGuard],
        data: { role: UserRole.COORDINATOR }
      },
      {
        path: 'pending-turns',
        component: PendingTurnsComponent,
        canActivate: [authGuard],
        data: { role: UserRole.COORDINATOR }
      },
      {
        path: 'completed-turns',
        component: CompletedTurnsComponent,
        canActivate: [authGuard],
        data: { role: UserRole.COORDINATOR }
      },
      {
        path: 'evaluation',
        component: EvaluationComponent,
        canActivate: [authGuard],
        data: { role: UserRole.COORDINATOR }
      },
      {
        path: 'my-pending-turns',
        component: MyPendingTurnsComponent,
        canActivate: [authGuard],
        data: { role: UserRole.ADVISOR }
      },
      {
        path: 'my-completed-turns',
        component: MyCompletedTurnsComponent,
        canActivate: [authGuard],
        data: { role: UserRole.ADVISOR }
      },
      {
        path: 'satisfaction-surveys',
        children: [
          {
            path: 'list',
            component: SatisfactionSurveysComponent,
            canActivate: [authGuard],
            data: { role: UserRole.COORDINATOR }
          },
          {
            path: 'stats',
            component: SurveyStatsComponent,
            canActivate: [authGuard],
            data: { role: UserRole.COORDINATOR }
          },
          {
            path: 'questions',
            component: SurveyQuestionsComponent,
            canActivate: [authGuard],
            data: { role: UserRole.COORDINATOR }
          }
        ]
      },
      {
        path: 'attention-turns',
        component: AttentionTurnsComponent,
        canActivate: [authGuard],
        data: { role: UserRole.COORDINATOR }
      }
    ]
  },
  {
    path: 'called-turns',
    component: CalledTurnsComponent
  },
  {
    path: 'schedule',
    component: ScheduleRequestComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];
