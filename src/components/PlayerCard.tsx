import { Player } from '@/models/player.interface';

interface Props {
  player: Player;
}

const PlayerCard = ({ player }: Props) => {
  return (
    <div
      key={player.name}
      className="flex gap-4 items-center border-4 text-xl border-gray-700 p-3 rounded-md"
    >
      <img
        src={player.image}
        className="border-4 border-gray-700 rounded-full w-14 h-14"
      />
      {player.name}
    </div>
  );
};

export default PlayerCard;
