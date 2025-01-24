import { Navigate, createBrowserRouter } from 'react-router-dom';
import StartPage from './pages/StartPage';
import SidebarLayout from './layouts/SidebarLayout';
import PreviousGamesPage from './pages/PreviousGamesPage';
import AuthGuard from './components/AuthGuard';
import DefaultLayout from './layouts/DefaultLayout';
import ProfilePage from './pages/ProfilePage';
import { FriendsPage } from './features/friends/';
import { KalookiRoutes } from './features/kalooki';
import { RiskRoutes } from './features/risk';

export const AppRoutes = {
  root: '/',
  start: '/start',
  addPlayers: '/kalooki/add-players',
  previousGames: '/previous-games',
  round: (round: string) => `/kalooki/round/${round}`,
  finalScore: '/kalooki/end',
  profile: '/profile',
  friends: '/friends',
  risk: {
    addPlayers: '/risk/add-players',
    round: '/risk/round',
  },
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
      { path: 'profile', element: <AuthGuard component={<ProfilePage />} /> },
      { path: 'friends', element: <AuthGuard component={<FriendsPage />} /> },
      { path: 'kalooki/*', children: KalookiRoutes },
      { path: 'risk/*', children: RiskRoutes },
      { path: '*', element: <Navigate to={AppRoutes.start} /> },
    ],
  },
  { path: '*', element: <Navigate to={AppRoutes.start} /> },
]);
