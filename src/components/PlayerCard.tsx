import { Player } from '@/models/player.interface';
import { getOrdinalSuffix } from '@/utils';

interface Props {
  player: Player;
  score?: number;
  winner?: boolean;
  order?: number;
}

const PlayerCard = ({ player, score, winner, order }: Props) => {
  return (
    <div
      key={player.name}
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
      <img
        src={player.imgUrl}
        className={`${
          winner ? 'border-yellow-500' : 'border-gray-700'
        } border-4 rounded-full w-14 h-14`}
      />
      {player.name}
      {score !== undefined && (
        <div className="ml-auto text-3xl font-bold">{score}</div>
      )}
    </div>
  );
};

export default PlayerCard;
