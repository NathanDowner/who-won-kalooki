import { Player } from '@/models/player.interface';
import { formatName } from '@/utils';
import React, { ForwardedRef, forwardRef, useMemo } from 'react';

type Props = {
  player: Player;
  isPlayerTurn: boolean;
  territoryCount: number;
  onDefend: () => void;
  onOpenKeypad: () => void;
};

const RiskPlayerCard = forwardRef(
  (
    { player, isPlayerTurn, territoryCount, onDefend, onOpenKeypad }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const name = useMemo(() => formatName(player.name), [player]);

    return (
      <div
        ref={ref}
        className={`${
          isPlayerTurn ? 'border-yellow-500 bg-yellow-400' : 'border-black'
        } border-4 rounded-md p-2 flex flex-col`}
      >
        <h3 className="text-2xl font-bold truncate-text">{name}</h3>
        {/* <p className="text-xl">Score: {scoreSoFar}</p> */}
        <p>{territoryCount > 1 ? 'Territories' : 'Territory'}:</p>
        <div
          className={`${
            isPlayerTurn ? 'ring-yellow-500' : 'ring-gray-300'
          } text-6xl text-center mb-4 bg-transparent focus:ring-2  rounded-md`}
          tabIndex={0}
          onFocus={() => onOpenKeypad()}
        >
          {territoryCount}
        </div>

        {/* buttons */}
        <div className="flex w-full">
          <button
            disabled={isPlayerTurn}
            onClick={onDefend}
            className="btn btn-sm btn-outline flex-1 border-2 mt-auto"
          >
            Attack!
          </button>
        </div>
      </div>
    );
  },
);

export default RiskPlayerCard;
