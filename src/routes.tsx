import { Navigate, createBrowserRouter } from 'react-router-dom';
import AddPlayersPage from './pages/AddPlayersPage';
import StartPage from './pages/StartPage';
import RoundPage from './pages/RoundPage';
import SidebarLayout from './layouts/SidebarLayout';
import PreviousGamesPage from './pages/PreviousGamesPage';
import AuthGuard from './components/AuthGuard';
import DefaultLayout from './layouts/DefaultLayout';
import FinalScorePage from './pages/FinalScorePage';

export const AppRoutes = {
  root: '/',
  start: '/start',
  addPlayers: '/add-players',
  previousGames: '/previous-games',
  round: (round: string) => `/round/${round}`,
};

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={AppRoutes.start} /> },
  {
    path: '',
    element: <DefaultLayout />,
    children: [
      {
        path: '/start',
        element: <SidebarLayout />,
        children: [{ path: '', element: <StartPage /> }],
      },
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
