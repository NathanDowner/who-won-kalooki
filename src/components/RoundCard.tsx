import { Player } from '@/models/player.interface';
import { formatName } from '@/utils';

interface Props {
  roundScore: number;
  currentScore: number;
  player: Player;
  isLeading: boolean;
}

const RoundCard = ({
  player,
  roundScore,
  currentScore,
  isLeading = false,
}: Props) => {
  const name = formatName(player.name);
  return (
    <div
      className={`${
        isLeading &&
        'relative after:-inset-3 after:border-4 after:border-black after:absolute after:rounded-md'
      } border-4 border-black rounded-md p-2 flex flex-col`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p>Score: {currentScore}</p>
      <p>Current:</p>
      <p className="text-6xl text-center mb-4">{roundScore}</p>
      <button className="btn btn-sm btn-outline border-2 w-full mt-auto">
        Extra!
      </button>
    </div>
  );
};

export default RoundCard;
