import { Player } from '@/models/player.interface';
import { useAppSelector } from '@/store/hooks';
import { selectTotalsUpToRound } from '@/store/scoreSlice';

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

  return (
    <tr>
      <th className="text-end inline-block w-full py-4 z-10">{round}</th>
      {players.map((player, idx) => {
        // const shouldShowScores = Math.max(...rounds[round]) !== 0;

        return (
          <td
            key={player.name}
            className={`text-center border-r border-gray-300 ${
              roundIdx !== 0
                ? 'relative after:absolute after:inset-0 after:w-3/5 after:h-0.5 after:bg-gray-300 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-[35deg]'
                : ''
            }`}
          >
            {/* {shouldShowScores && (
                        <> */}
            <span
              className={`${roundIdx !== 0 ? 'absolute' : ''} top-0 left-3`}
            >
              {roundScores[idx]}
            </span>
            <span className="absolute bottom-0 right-3 font-bold">
              {totalsSoFar[idx]}
            </span>
            {/* </>
                      )} */}
          </td>
        );
      })}
    </tr>
  );
};
