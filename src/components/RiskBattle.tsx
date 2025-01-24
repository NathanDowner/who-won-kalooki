import { Player } from '@/models/player.interface';
import { formatName } from '@/utils';
import React from 'react';
import Button from './Button';

type Props = {
  attacker: Player;
  defender: Player;
  attackerIdx: number;
  defenderIdx: number;
  onBattleEnd: (winningIndex: number) => void;
  onCancel: () => void;
};

const RiskBattle = ({
  attacker,
  attackerIdx,
  defender,
  defenderIdx,
  onBattleEnd,
  onCancel,
}: Props) => {
  const handleWin = (winningIdx: number) => {
    onBattleEnd(winningIdx);
  };

  return (
    <div className="flex justify-between items-center border-2 border-black p-4 rounded-md mt-8">
      <button
        onClick={() => handleWin(attackerIdx)}
        className="btn flex flex-col border-2 border-black text-center"
      >
        <p>{formatName(attacker.name)}</p>
        <p>Winner</p>
      </button>

      <Button onClick={onCancel}>Cancel Battle</Button>
      <button
        onClick={() => handleWin(defenderIdx)}
        className="btn flex flex-col border-2 border-black"
      >
        <p>{formatName(defender.name)}</p>
        <p>Winner</p>
      </button>
    </div>
  );
};

export default RiskBattle;
