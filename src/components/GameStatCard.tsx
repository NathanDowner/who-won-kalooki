import { GameStats } from '@/models/game.interface';
import Card from './Card';
import { PieChart } from 'react-minimal-pie-chart';
import clsx from 'clsx';
import { getPercentage } from '@/utils';

interface GameStatCardProps {
  gameStats: GameStats;
}

const GameStatCard = ({ gameStats }: GameStatCardProps) => {
  const totalGames = gameStats.wins + gameStats.losses;

  return (
    <Card>
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">{gameStats.gameName}</h2>
          <div className="flex flex-col">
            <h3 className="font-semibold text-xl">
              Games Played: <span className="text-2xl">{totalGames}</span>
            </h3>
            <h3 className="font-semibold text-xl">
              Win %:{' '}
              <span
                className={clsx('text-3xl', {
                  'text-green-700':
                    getPercentage(gameStats.wins, totalGames) > 0,
                  'text-red-700': getPercentage(gameStats.wins, totalGames) < 0,
                })}
              >
                {getPercentage(gameStats.wins, totalGames).toFixed(1)}%
              </span>
            </h3>
          </div>
        </div>
        <PieChart
          className="h-[150px] w-[150px]"
          startAngle={-90}
          label={({ dataEntry: { title, value } }) => `${title} ${value}`}
          labelStyle={{ fill: '#fff', fontSize: '10px' }}
          data={[
            {
              title: 'won',
              value: gameStats.wins,
              color: '#2E9D46',
            },
            {
              title: 'lost',
              value: gameStats.losses,
              color: '#CA2500',
            },
          ]}
        />
      </div>
    </Card>
  );
};

export default GameStatCard;
