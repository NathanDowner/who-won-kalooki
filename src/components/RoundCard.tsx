import { Player } from '@/models/player.interface';
import { formatName } from '@/utils';
import { PENALTY_AMOUNT } from '@/utils/constants';

interface Props {
  currentRoundScore: number;
  scoreSoFar: number;
  player: Player;
  isLeading: boolean;
  // onPenalty: () => void;
  onReward: () => void;
  disableReward: boolean;
  setScore: (score: number) => void;
}

const RoundCard = ({
  player,
  currentRoundScore,
  scoreSoFar,
  isLeading = false,
  setScore,
  // onPenalty,
  onReward,
  disableReward,
}: Props) => {
  const name = formatName(player.name);

  const handlePenalty = () => {
    setScore(currentRoundScore + PENALTY_AMOUNT);
  };

  return (
    <div
      className={`${
        isLeading ? 'border-yellow-500 bg-yellow-400' : 'border-black'
      } border-4 rounded-md p-2 flex flex-col`}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <p className="text-xl">Score: {scoreSoFar}</p>
      <p>Current:</p>
      <input
        className="text-6xl text-center mb-4 -mr-3 bg-transparent"
        type="number"
        value={currentRoundScore}
        onChange={(e) => setScore(Number(e.target.value))}
      />

      {/* buttons */}
      <div className="flex gap-2 w-full">
        <button
          disabled={disableReward}
          onClick={onReward}
          className="btn btn-sm btn-outline flex-1 border-2 mt-auto"
        >
          -50
        </button>
        <button
          onClick={handlePenalty}
          className={`${
            isLeading ? 'bg-yellow-500 border-yellow-500' : ''
          } btn btn-sm flex-1 border-2 mt-auto`}
        >
          +50
        </button>
      </div>
    </div>
  );
};

export default RoundCard;
