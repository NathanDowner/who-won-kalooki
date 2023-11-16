import { Player } from '@/models/player.interface';

interface Props {
  player: Player;
  score?: number;
  winner?: boolean;
}

const PlayerCard = ({ player, score, winner }: Props) => {
  return (
    <div
      key={player.name}
      className={`${
        winner ? 'bg-yellow-400 border-yellow-500' : 'border-gray-700'
      } flex gap-4 items-center border-4 text-xl  p-3 rounded-md`}
    >
      <img
        src={player.image}
        className="border-4 border-gray-700 rounded-full w-14 h-14"
      />
      {player.name}
      {score && <div className="ml-auto text-3xl font-bold">{score}</div>}
    </div>
  );
};

export default PlayerCard;
