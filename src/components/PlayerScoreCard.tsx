import { getOrdinalSuffix } from '@/utils';
import UserProfileImage from './UserProfileImage';

interface Props {
  playerName: string;
  imgUrl?: string;
  score?: number;
  winner?: boolean;
  order?: number;
}

const PlayerScoreCard = ({
  playerName,
  imgUrl,
  score,
  winner,
  order,
}: Props) => {
  return (
    <div
      key={playerName}
      className={`${
        winner ? 'bg-yellow-400 border-yellow-500' : 'border-gray-700'
      } flex gap-4 items-center border-4 text-xl  p-3 rounded-md`}
    >
      {order && (
        <div>
          <span className="text-5xl tabular-nums">{order}</span>
          {getOrdinalSuffix(order)}
        </div>
      )}
      <UserProfileImage
        imgUrl={imgUrl}
        className={`${winner ? 'border-yellow-500' : ''} w-14 h-14`}
      />
      <span className="truncate-text">{playerName}</span>
      {score !== undefined && (
        <div className="ml-auto text-3xl font-bold">{score}</div>
      )}
    </div>
  );
};

export default PlayerScoreCard;
