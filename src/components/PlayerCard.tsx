import Card from '@/components/Card';
import UserProfileImage from '@/components/UserProfileImage';
import { SimpleUserProfile } from '@/models/user.model';
import clsx from 'clsx';

type Props = {
  user: SimpleUserProfile;
  isSelected?: boolean;
  onClick?: () => void;
};

const PlayerCard = ({ user, isSelected, onClick }: Props) => {
  return (
    <Card
      onClick={onClick}
      className={clsx(
        'flex gap-4 items-center',
        isSelected && 'border-green-600 bg-green-50',
      )}
    >
      <UserProfileImage
        imgUrl={user.imgUrl}
        className={clsx('w-14 h-14', isSelected && 'border-green-600')}
      />
      <div className="flex flex-col items-start text-xl">
        <h3 className={clsx('truncate-text', isSelected && 'text-green-600')}>
          {user.fullName}
        </h3>

        <small
          className={clsx(
            'text-gray-400 italic',
            isSelected && 'text-green-600/60',
          )}
        >
          @{user.userName}
        </small>
      </div>
      {isSelected && (
        <div className="grid place-items-center bg-green-400 rounded-e-sm text-white -m-3 ml-auto self-stretch">
          <span className="p-2">✔</span>
        </div>
      )}
    </Card>
  );
};

export default PlayerCard;
