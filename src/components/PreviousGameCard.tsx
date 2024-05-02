import { Game } from '@/models/game.interface';
import { findLastRoundPlayed, formatDate } from '@/utils';

interface PreviousGameCardProps {
  game: Game;
  onSelectGame: () => void;
  isSelected: boolean;
}

const PreviousGameCard = ({
  game,
  onSelectGame,
  isSelected,
}: PreviousGameCardProps) => {
  return (
    <div
      onClick={onSelectGame}
      className={`${
        isSelected ? 'border-yellow-500 bg-yellow-100' : 'border-black'
      } border-4 rounded-md p-3 flex flex-col cursor-pointer`}
    >
      <h2 className="text-xl">Played on {formatDate(game.endedAt.toDate())}</h2>

      {/* Details */}
      <div className="flex justify-between">
        {/* Players */}
        <div className="flex flex-col mt-4">
          <h3 className="">Players:</h3>
          <ul className="">
            {game.players.map((player) => (
              <li className=" list-inside" key={player.name}>
                - {player.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Last round */}
        <div className="flex flex-col mt-4">
          <h3 className="">Last Round:</h3>
          <p>- {findLastRoundPlayed(game.scores)}</p>
        </div>
      </div>
    </div>
  );
};

export default PreviousGameCard;
