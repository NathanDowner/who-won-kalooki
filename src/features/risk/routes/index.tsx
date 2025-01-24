import { RouteObject } from 'react-router-dom';
import RiskAddPlayersPage from './RiskAddPlayersPage';
import RiskRoundPage from './RiskRoundPage';

export const RiskRoutes: RouteObject[] = [
  {
    path: 'add-players',
    element: <RiskAddPlayersPage />,
  },
  {
    path: 'round',
    element: <RiskRoundPage />,
  },
];
