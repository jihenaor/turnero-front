import { environment } from '../../environments/environment';

const BASE_PATH = environment.production ? '/turnero-web' : '';

export const ROUTES = {
  LOGIN: `${BASE_PATH}/login`,
  DASHBOARD: `${BASE_PATH}/dashboard`,
  DASHBOARD_PENDING_TURNS: `${BASE_PATH}/dashboard/my-pending-turns`,
  HOME: `${BASE_PATH}/`,
  UNAUTHORIZED: `${BASE_PATH}/unauthorized`,
  CALLED_TURNS: `${BASE_PATH}/called-turns`
} as const;
