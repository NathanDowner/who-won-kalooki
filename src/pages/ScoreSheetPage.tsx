import { ScoreSheetRow } from './../components/ScoreSheetRow';
import { useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import { selectRounds } from '@/store/scoreSlice';
import { formatName } from '@/utils';
import { ROUNDS } from '@/utils/constants';

interface Props {
  onClose: () => void;
}

const ScoreSheetPage = ({ onClose }: Props) => {
  const players = useAppSelector(selectPlayers);
  const rounds = useAppSelector(selectRounds);

  return (
    <div className="bg-white p-4 rounded-t-sm w-screen max-h-screen">
      <header className="flex flex-col">
        <button
          className="btn btn-square btn-outline ml-auto"
          onClick={() => onClose()}
        >
          X
        </button>
        <h2 className="text-center text-xl mb-4">Score Sheet View</h2>
      </header>

      <div className="overflow-x-auto">
        <table className="table table-sm table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th className="border-r border-gray-300" />
              {players.map((player) => (
                <th
                  className="text-center border-r border-gray-300"
                  key={player.name}
                >
                  {formatName(player.name)}
                </th>
              ))}
              <th className="px-1" />
            </tr>
          </thead>

          <tbody>
            {ROUNDS.map((round, roundIdx) => (
              <ScoreSheetRow
                key={round}
                round={round}
                players={players}
                roundIdx={roundIdx}
                roundScores={rounds[round]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreSheetPage;
