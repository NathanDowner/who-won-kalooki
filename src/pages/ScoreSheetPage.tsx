import { useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import { formatName } from '@/utils';
import { ROUNDS } from '@/utils/constants';

const ScoreSheetPage = () => {
  const players = useAppSelector(selectPlayers);
  return (
    <div className="bg-gray-200 p-4 rounded-t-lg">
      <header>
        <h2 className="text-center text-xl mb-4">Score Sheet View</h2>
      </header>

      <div className="overflow-x-auto max-w-md">
        <table className="table table-sm table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              {players.map((player) => (
                <th key={player.name}>{formatName(player.name)}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {ROUNDS.map((round) => (
              <tr key={round}>
                <td className="text-end">{round}</td>
                {players.map((player) => (
                  <td key={player.name} className="text-center">
                    0
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreSheetPage;
