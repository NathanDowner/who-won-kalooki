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
import Logo from '@/components/Logo';
import Loader from '@/components/Loader';
import { storage } from '@/utils/storage';
import Modal from '@/components/Modal';
import UserProfileForm from '@/components/UserProfileForm';
import { UserProfile } from '@/models/user.model';
import toast from 'react-hot-toast';
import { Animations } from '@/components/animations';

const StartPage = () => {
  const {
    user,
    signInWithGoogle,
    logout,
    loading: authLoading,
    showProfileModal,
    setShowProfileModal,
    setUserProfile,
  } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearPlayers());
    dispatch(resetScores());
    storage.clearData();
  }, []);

  function handleSaveProfile(profile: UserProfile) {
    setUserProfile(profile);
    setShowProfileModal(false);
    toast.success('Profile created successfully');
  }

  return (
    <div className="flex flex-col items-center justify-between  -mt-6">
      <Loader isLoading={authLoading} text="Loading" />
      <header className="flex flex-col items-center">
        <Logo className="h-24" />
        <h1 className="text-4xl font-bold mb-14">Who Won?</h1>

        <div className="mb-8 grid gap-4 grid-cols-2 grid-rows-2">
          <img
            className="w-24 h-24 rounded-full"
            src={user ? user.photoURL! : girl1}
            alt={
              user ? `Image of ${user.displayName}` : 'Random avatar image 1'
            }
          />
          <img
            className="w-24 h-24 test"
            src={boy1}
            alt="Random avatar image 2"
          />
          <img className="w-24 h-24" src={girl2} alt="Random avatar image 3" />
          <img className="w-24 h-24" src={boy2} alt="Random avatar image 4" />
        </div>
        {user && <h2 className="text-2xl mb-4">Was it {user.displayName}?</h2>}
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
          <Link
            to={AppRoutes.previousGames + '?filter=incomplete'}
            className={clsx('btn btn-lg')}
          >
            Resume a game
          </Link>
        )}

        {user && (
          <button className="btn btn-link" onClick={logout}>
            Logout
          </button>
        )}
      </div>
      {user && (
        <Modal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          closeOnBackdropClick={false}
          title="Create Profile"
        >
          <Animations.AnimateChangeInHeight>
            <UserProfileForm user={user} onSuccess={handleSaveProfile} />
          </Animations.AnimateChangeInHeight>
        </Modal>
      )}
    </div>
  );
};

export default StartPage;
