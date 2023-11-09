import { useAuth } from '@/contexts/AuthContext';
import { AppRoutes } from '@/routes';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  return (
    <header className="bg-gray-300">
      <div className="flex justify-between items-center mx-auto max-w-5xl p-4">
        <h3 className="text-2xl text-center">
          <Link to={AppRoutes.root}>Who Won?</Link>
        </h3>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              {/* <Link to={}>My Lists</Link> */}
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <img
                  className="inline-block w-8 h-8 rounded-full"
                  src={user.photoURL || '/default-profile.png'}
                  alt={`${user.displayName}'s profile photo`}
                />
                <span>{user.displayName}</span>
              </div>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <button onClick={() => signInWithGoogle()}>Login</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
