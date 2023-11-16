import { Player } from '@/models/player.interface';
import { formatName } from '@/utils';

interface Props {
  currentRoundScore: number;
  scoreSoFar: number;
  player: Player;
  isLeading: boolean;
  setScore: (score: number) => void;
}

const RoundCard = ({
  player,
  currentRoundScore,
  scoreSoFar,
  isLeading = false,
  setScore,
}: Props) => {
  const name = formatName(player.name);
  return (
    <div
      className={`${
        isLeading ? 'border-yellow-500 bg-yellow-400' : 'border-black'
      } border-4 rounded-md p-2 flex flex-col`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p>Score: {scoreSoFar}</p>
      <p>Current:</p>
      <input
        className="text-6xl text-center mb-4 bg-transparent"
        value={currentRoundScore}
        onChange={(e) => setScore(Number(e.target.value))}
      />
      <button className="btn btn-sm btn-outline border-2 w-full mt-auto">
        Extra!
      </button>
    </div>
  );
};

export default RoundCard;
