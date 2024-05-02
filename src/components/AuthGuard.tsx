import { useAuth } from '@/contexts/AuthContext';
import { AppRoutes } from '@/routes';
import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  component: React.ReactNode;
}

const AuthGuard = ({ component }: AuthGuardProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to={AppRoutes.start} />;
  return <>{component}</>;
};

export default AuthGuard;
