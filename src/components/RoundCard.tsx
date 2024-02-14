import { Player } from '@/models/player.interface';
import { formatName, removeLeadingZero } from '@/utils';
import { PENALTY_AMOUNT } from '@/utils/constants';
import { useState } from 'react';
import Portal from './Portal';
import { Animations } from './animations';
import Keypad from './Keypad';

interface Props {
  currentRoundScore: number;
  scoreSoFar: number;
  player: Player;
  isLeading: boolean;
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
  const [showKeypad, setShowKeypad] = useState(false);

  const name = formatName(player.name);

  const handlePenalty = () => {
    setScore(currentRoundScore + PENALTY_AMOUNT);
  };

  const formatNumber = (num: string) => {
    setScore(parseInt(removeLeadingZero(num)) || 0);
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
        className="text-6xl text-center mb-4 bg-transparent"
        type="text"
        onFocus={() => setShowKeypad(true)}
        value={currentRoundScore}
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
      <Portal>
        <Animations.SlideUp show={showKeypad}>
          <Keypad
            initialValue={currentRoundScore}
            onChange={formatNumber}
            onClose={() => setShowKeypad(false)}
          />
        </Animations.SlideUp>
      </Portal>
    </div>
  );
};

export default RoundCard;
