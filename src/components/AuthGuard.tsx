import { useAuth } from '@/contexts/AuthContext';
import { AppRoutes } from '@/routes';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to={AppRoutes.newList} />;
  return <Outlet />;
};

export default AuthGuard;
