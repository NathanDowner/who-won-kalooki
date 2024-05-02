import { Navigate, createBrowserRouter } from 'react-router-dom';
import AddPlayersPage from './pages/AddPlayersPage';
import StartPage from './pages/StartPage';
import RoundPage from './pages/RoundPage';
import DefaultLayout from './layouts/DefaultLayout';
import PreviousGamesPage from './pages/PreviousGamesPage';
import AuthGuard from './components/AuthGuard';

export const AppRoutes = {
  root: '/',
  start: '/start',
  addPlayers: '/play/add-players',
  previousGames: '/play/previous-games',
  round: (round: string) => `/play/round/${round}`,
};

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={AppRoutes.start} /> },
  { path: '/start', element: <StartPage /> },
  {
    path: '/play/',
    element: <DefaultLayout />,
    children: [
      {
        path: 'previous-games',
        element: <AuthGuard component={<PreviousGamesPage />} />,
      },
      { path: 'add-players', element: <AddPlayersPage /> },
      { path: 'round/:round', element: <RoundPage /> },
      { path: '*', element: <Navigate to={AppRoutes.start} /> },
    ],
  },
  { path: '*', element: <Navigate to={AppRoutes.start} /> },
]);
