import { Navigate, createBrowserRouter } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
import AddPlayersPage from './pages/AddPlayersPage';
import StartPage from './pages/StartPage';
import RoundPage from './pages/RoundPage';

export const AppRoutes = {
  root: '/',
  start: '/start',
  addPlayers: '/play/add-players',
  round: (round: string) => `/play/round/${round}`,
  // guestListBuilder: (listId: string) => `/lists/${listId}`,
};

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={AppRoutes.start} /> },
  { path: '/start', element: <StartPage /> },
  {
    path: '/play/',
    element: <AuthGuard />,
    children: [
      { path: 'add-players', element: <AddPlayersPage /> },
      { path: 'round/:round', element: <RoundPage /> },
    ],
  },
]);
