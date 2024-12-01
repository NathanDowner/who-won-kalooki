import Card from '@/components/Card';
import UserProfileImage from '@/components/UserProfileImage';
import { SimpleUserProfile } from '@/models/user.model';

type Props = {
  user: SimpleUserProfile;
  isSelected?: boolean;
  onClick?: () => void;
};

const PlayerCard = ({ user, isSelected, onClick }: Props) => {
  return (
    <Card onClick={onClick} className="flex gap-4 items-center">
      <UserProfileImage imgUrl={user.imgUrl} className="w-14 h-14" />
      <div className="flex flex-col items-start text-xl">
        <h3 className="truncate-text">{user.fullName}</h3>

        <small className="text-gray-400 italic">@{user.userName}</small>
      </div>
    </Card>
  );
};

export default PlayerCard;
