import { Game } from '@/models/game.interface';
import { findLastRoundPlayed, formatDate, splitList } from '@/utils';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/solid';

interface PreviousGameCardProps {
  game: Game;
  onSelectGame: () => void;
  onResumeGame: () => void;
  onDeleteGame: () => void;
  onViewGame: () => void;
  isSelected: boolean;
}

const PreviousGameCard = ({
  game,
  onSelectGame,
  isSelected,
  onResumeGame,
  onViewGame,
  onDeleteGame,
}: PreviousGameCardProps) => {
  const [leftPlayerList, rightPlayerList] = splitList(game.players);
  return (
    <div
      onClick={onSelectGame}
      className="border-black border-4 rounded-md p-3 pb-0 flex flex-col cursor-pointer"
    >
      <h2 className="text-xl font-semibold">
        Played on {formatDate(game.endedAt.toDate())}
      </h2>
      <p>Last Round: {findLastRoundPlayed(game.scores)}</p>
      <div className="flex justify-between items-center pb-2">
        {game.winner && (
          <div>
            {game.isComplete ? 'Winner' : 'Leading'}:{' '}
            {game.winner.imgUrl && (
              <img
                src={game.winner.imgUrl}
                alt="Winner's profile photo"
                className="h-6 w-6 rounded-full inline-block"
              />
            )}{' '}
            {game.winner.name.split(' ')[0]}{' '}
            {/* TODO:  get name from user profile*/}
          </div>
        )}

        {!isSelected && (
          <div className="flex items-center gap-1">
            <UserCircleIcon className="h-5" />
            <span>{game.players.length}</span>
          </div>
        )}
      </div>

      {/* Players list */}
      {isSelected && (
        <>
          <h3 className="font-semibold text-lg">Players:</h3>
          <div className="grid grid-cols-2 pb-1">
            <ul className="">
              {leftPlayerList.map((player) => (
                <li className=" list-inside" key={player.name}>
                  - {player.name}
                </li>
              ))}
            </ul>

            <ul className="">
              {rightPlayerList.map((player) => (
                <li className=" list-inside" key={player.name}>
                  - {player.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {isSelected && (
        <footer className=" border-t-4 -mx-3 p-2 flex gap-2 border-black">
          <button
            onClick={onDeleteGame}
            disabled={game.isComplete}
            className="hidden btn btn-sm bg-red-500 disabled:bg-red-200"
          >
            <TrashIcon className="h-4 text-white" />
          </button>
          <button
            onClick={onViewGame}
            className="btn btn-sm bg-blue-400 text-white"
          >
            <EyeIcon className="h-4" /> View
          </button>
          {!game.isComplete && (
            <button
              onClick={onResumeGame}
              className="btn btn-sm btn-outline ml-auto"
            >
              Resume
            </button>
          )}
        </footer>
      )}
    </div>
  );
};

export default PreviousGameCard;
