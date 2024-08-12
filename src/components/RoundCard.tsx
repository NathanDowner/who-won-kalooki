import { Player } from '@/models/player.interface';
import { formatName } from '@/utils';
import { PENALTY_AMOUNT } from '@/utils/constants';
import { ForwardedRef, forwardRef } from 'react';

interface Props {
  currentRoundScore: number;
  scoreSoFar: number;
  player: Player;
  isLeading: boolean;
  onReward: () => void;
  disableReward: boolean;
  setScore: (score: number) => void;
  onOpenKeypad: () => void;
}

const RoundCard = forwardRef(
  (
    {
      player,
      currentRoundScore,
      scoreSoFar,
      isLeading,
      setScore,
      onReward,
      disableReward,
      onOpenKeypad,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const name = formatName(player.name);

    const handlePenalty = () => {
      setScore(currentRoundScore + PENALTY_AMOUNT);
    };

    return (
      <div
        ref={ref}
        className={`${
          isLeading ? 'border-yellow-500 bg-yellow-400' : 'border-black'
        } border-4 rounded-md p-2 flex flex-col`}
      >
        <h3 className="text-2xl font-bold truncate-text">{name}</h3>
        <p className="text-xl">Score: {scoreSoFar}</p>
        <p>Current:</p>
        <div
          className={`${
            isLeading ? 'ring-yellow-500' : 'ring-gray-300'
          } text-6xl text-center mb-4 bg-transparent focus:ring-2  rounded-md`}
          tabIndex={0}
          onFocus={() => onOpenKeypad()}
        >
          {currentRoundScore}
        </div>

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
  },
);

export default RoundCard;
