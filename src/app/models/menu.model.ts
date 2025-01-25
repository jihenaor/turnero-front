import { UserRole } from "./user.model";

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  roles: UserRole[];
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
  }
]; 