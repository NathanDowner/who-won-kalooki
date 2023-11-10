import { useAuth } from '@/contexts/AuthContext';
import { AppRoutes } from '@/routes';
import { Link } from 'react-router-dom';

// https://i.pravatar.cc/300

type StartPageProps = {};

const StartPage = ({}: StartPageProps) => {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <div className="max-w-sm mx-auto bg-gray-50 min-h-screen flex flex-col items-center justify-between pt-10 pb-32">
      <header className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-14">Who Won?</h1>
        <img
          className="w-28 h-28 rounded-full border-2"
          src={user ? user.photoURL! : 'https://avatar.iran.liara.run/public'}
          alt="Random avatar image"
        />
      </header>
      {user ? (
        <div className="flex flex-col items-center gap-4">
          <Link to={AppRoutes.addPlayers} className="btn btn-lg">
            Start a new game
          </Link>
          <button className="underline" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="btn btn-lg" onClick={() => signInWithGoogle()}>
          Login w/ Google
        </button>
      )}
    </div>
  );
};

export default StartPage;
