import AppHeader from '@/components/AppHeader';
import { useAuth } from '@/contexts/AuthContext';
import UserProfileComponent from '@/features/notifications/components/UserProfileComponent';
import { UserProfile } from '@/models/user.model';

const ProfilePage = () => {
  const { userProfile } = useAuth();

  return (
    <>
      <div className="page">
        <AppHeader title="Profile" />
        <UserProfileComponent
          userProfile={userProfile as UserProfile}
          isCurrentUser
        />
      </div>
    </>
  );
};

export default ProfilePage;
