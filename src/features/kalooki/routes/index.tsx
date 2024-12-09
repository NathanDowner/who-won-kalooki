import { Navigate, RouteObject } from 'react-router-dom';
import KalookiAddPlayerPage from './KalookiAddPlayerPage';
import RoundPage from './RoundPage';
import FinalScorePage from './FinalScorePage';

export const KalookiRoutes: RouteObject[] = [
  {
    path: 'add-players',
    element: <KalookiAddPlayerPage />,
  },
  {
    path: 'round/:round',
    element: <RoundPage />,
  },
  {
    path: 'end',
    element: <FinalScorePage />,
  },
  {
    path: '*',
    element: <Navigate to="add-players" />,
  },
];
