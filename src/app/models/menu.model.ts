import { UserRole } from "./user.model";

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  roles: UserRole[];
  subItems?: MenuItem[];
  isOpen?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'services',
    label: 'Servicios',
    icon: 'services-icon',
    route: '/dashboard/services',
    roles: [UserRole.COORDINATOR]
  },
  {
    id: 'advisors',
    label: 'Asesores',
    icon: 'advisors-icon',
    route: '/dashboard/advisors',
    roles: [UserRole.COORDINATOR]
  },
  {
    id: 'pending-turns',
    label: 'Turnos en Espera',
    icon: 'pending-icon',
    route: '/dashboard/pending-turns',
    roles: [UserRole.COORDINATOR]
  },
  {
    id: 'attention-turns',
    label: 'Turnos en Atención',
    icon: 'pending-icon',
    route: '/dashboard/attention-turns',
    roles: [UserRole.COORDINATOR]
  },
  {
    id: 'completed-turns',
    label: 'Turnos Atendidos',
    icon: 'completed-icon',
    route: '/dashboard/completed-turns',
    roles: [UserRole.COORDINATOR]
  },
  {
    id: 'evaluation',
    label: 'Evaluación y Seguimiento',
    icon: 'evaluation-icon',
    route: '/dashboard/evaluation',
    roles: [UserRole.COORDINATOR]
  },
  {
    id: 'my-pending-turns',
    label: 'Mis Turnos en Espera',
    icon: 'my-pending-icon',
    route: '/dashboard/my-pending-turns',
    roles: [UserRole.ADVISOR]
  },
  {
    id: 'my-completed-turns',
    label: 'Mis Turnos Atendidos',
    icon: 'my-completed-icon',
    route: '/dashboard/my-completed-turns',
    roles: [UserRole.ADVISOR]
  },
  {
    id: 'satisfaction-surveys',
    label: 'Encuestas de Satisfacción',
    icon: 'star-icon',
    roles: [UserRole.COORDINATOR],
    subItems: [
      {
        id: 'view-surveys',
        label: 'Consultar Encuestas',
        icon: 'list-icon',
        route: '/dashboard/satisfaction-surveys/list',
        roles: [UserRole.COORDINATOR]
      },
      {
        id: 'survey-stats',
        label: 'Estadísticas',
        icon: 'chart-icon',
        route: '/dashboard/satisfaction-surveys/stats',
        roles: [UserRole.COORDINATOR]
      },
      {
        id: 'survey-questions',
        label: 'Preguntas',
        icon: 'question-icon',
        route: '/dashboard/satisfaction-surveys/questions',
        roles: [UserRole.COORDINATOR]
      }
    ]
  }
]; 