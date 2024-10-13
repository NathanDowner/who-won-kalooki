import Logo from './Logo';
import { UserProfile } from '@/models/user.model';

interface ProfileHeaderProps {
  userProfile: UserProfile;
}

const ProfileHeader = ({ userProfile }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="-mb-5 z-10 relative">
        <Logo className="h-24 absolute -top-[4.12rem] -left-1 -rotate-6" />
        <img
          src={userProfile?.imgUrl || ''}
          className="rounded-full h-[85px] w-[85px] border-4 border-black bg-white"
          alt="Display picture"
        />
      </div>
      <div className="border-black border-4 p-2 text-center rounded-md pt-3 w-full">
        <h3 className="text-xl font-semibold tracking-widest">
          {userProfile?.fullName}
        </h3>
        {userProfile && <h4>@{userProfile?.userName}</h4>}
      </div>
    </div>
  );
};

export default ProfileHeader;
