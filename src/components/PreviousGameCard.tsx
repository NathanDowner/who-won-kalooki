import { useAuth } from '@/contexts/AuthContext';
import { Game } from '@/models/game.interface';
import { findLastRoundPlayed, formatDate, splitList } from '@/utils';
import defaultUserImg from '@/assets/default-user.svg';
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
  const { userProfile } = useAuth();

  const playerImgUrls = game.players
    .filter((p) => p.imgUrl)
    .map((player) => player.imgUrl);

  const numPlayersWithoutImg = game.players.length - playerImgUrls.length;

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
            <img
              src={game.winner.imgUrl ?? defaultUserImg}
              alt="Winner's profile photo"
              className="h-6 w-6 rounded-full inline-block border-2 border-black"
            />{' '}
            {game.winner.name.split(' ')[0]}{' '}
          </div>
        )}

        {!isSelected && (
          <div className="flex items-center -space-x-2">
            {playerImgUrls.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Player ${game.players[idx].name}'s profile picture`}
                className="h-6 w-6 rounded-full inline-block border-2 border-black"
              />
            ))}
            {numPlayersWithoutImg > 0 && (
              <div className="h-6 w-6 bg-white rounded-full border-2 border-black flex items-center justify-center">
                <span> +{numPlayersWithoutImg}</span>
              </div>
            )}
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
            disabled={
              game.isComplete || game.creator.userName !== userProfile?.userName
            }
            className="btn btn-sm bg-red-500 disabled:bg-red-200"
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
              disabled={game.creator.userName !== userProfile?.userName}
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
