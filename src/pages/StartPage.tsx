import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { clearPlayers } from '@/store/playersSlice';
import { resetScores } from '@/store/scoreSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import girl1 from '../assets/girl_1.png';
import girl2 from '../assets/girl_2.png';
import boy1 from '../assets/boy_1.png';
import boy2 from '../assets/boy_2.png';
import { useAuth } from '@/contexts/AuthContext';
import { clsx } from 'clsx';

const StartPage = () => {
  const { user, signInWithGoogle, logout } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearPlayers());
    dispatch(resetScores());
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-between pt-10 pb-32">
      <header className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-14">Who Won?</h1>

        <div className="grid gap-4 grid-cols-2 grid-rows-2">
          <img
            className="w-28 h-28 rounded-full"
            src={user ? user.photoURL! : girl1}
            alt={
              user ? `Image of ${user.displayName}` : 'Random avatar image 1'
            }
          />
          <img
            className="w-28 h-28 test"
            src={boy1}
            alt="Random avatar image 2"
          />
          <img className="w-28 h-28" src={girl2} alt="Random avatar image 3" />
          <img className="w-28 h-28" src={boy2} alt="Random avatar image 4" />
        </div>
        {user && <h2 className="text-2xl mt-8">Was it {user.displayName}?</h2>}
      </header>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4">
        {!user && (
          <button className="btn btn-lg" onClick={() => signInWithGoogle()}>
            Login w/ Google
          </button>
        )}

        <Link
          to={AppRoutes.addPlayers}
          className={clsx('btn btn-lg', { 'btn-link': !user })}
        >
          {user ? 'Start a new game' : 'Play as Guest'}
        </Link>

        {user && (
          <button className="btn btn-link" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default StartPage;
