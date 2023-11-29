import { Player } from '@/models/player.interface';
import { useAppSelector } from '@/store/hooks';
import { selectTotalsUpToRound } from '@/store/scoreSlice';
import { useMemo } from 'react';

interface Props {
  round: string;
  players: Player[];
  roundIdx: number;
  roundScores: number[];
}
export const ScoreSheetRow = ({
  round,
  players,
  roundIdx,
  roundScores,
}: Props) => {
  const totalsSoFar = useAppSelector(selectTotalsUpToRound(round, true));
  const shouldShowScores = useMemo(
    () => Math.max(...roundScores) !== 0,
    [roundScores],
  );

  const showTotalsSoFar = roundIdx !== 0;

  return (
    <tr>
      <th className="text-end border-r-2 border-gray-300 py-3 z-10">{round}</th>
      {players.map((player, idx) => (
        <td
          key={player.name}
          className={`text-center border-r border-gray-300 ${
            showTotalsSoFar && shouldShowScores
              ? 'relative after:absolute after:inset-0 after:w-3/5 after:h-0.5 after:bg-gray-300 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-[35deg]'
              : ''
          }`}
        >
          {shouldShowScores && (
            <>
              <span
                className={`${showTotalsSoFar ? 'absolute' : ''} top-0 left-3`}
              >
                {roundScores[idx]}
              </span>
              {showTotalsSoFar && (
                <span className="absolute bottom-0 right-3 font-bold">
                  {totalsSoFar[idx]}
                </span>
              )}
            </>
          )}
        </td>
      ))}
      <td className="px-1" />
    </tr>
  );
};
