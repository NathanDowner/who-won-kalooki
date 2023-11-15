import RoundCard from '@/components/RoundCard';
import { useTitle } from '@/contexts/TitleContext';
import { useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import { selectRoundScores, selectTotalsUpToRound } from '@/store/scoreSlice';
import { formatRound } from '@/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Props = {};

const RoundPage = ({}: Props) => {
  const { round } = useParams();
  const { setTitle } = useTitle();
  const players = useAppSelector(selectPlayers);
  const currentRoundScores = useAppSelector(selectRoundScores(round!));
  const totalsSoFar = useAppSelector(selectTotalsUpToRound(round!));
  const [roundScores, setRoundScores] = useState<number[]>(currentRoundScores);

  useEffect(() => {
    setTitle(`Round ${formatRound(round!)}`);
  }, [round]);

  const setScore = (idx: number, score: number) => {
    setRoundScores((prev) => {
      const newScores = [...prev];
      newScores[idx] = score;
      return newScores;
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <header className="text-center mb-4">
        <h1 className="text-2xl">{round}</h1>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-6 mb-20">
        {players.map((player, idx) => (
          <RoundCard
            key={idx}
            isLeading={false}
            player={player}
            setScore={(score: number) => setScore(idx, score)}
            currentScore={totalsSoFar[idx]}
            roundScore={roundScores[idx]}
          />
        ))}
        <div className="rounded-md border-4 flex flex-col items-center justify-center text-2xl h-[212px] border-black border-dashed hover:border-solid">
          <div className="text-4xl">+</div> <div>Add Player</div>
        </div>
      </div>
      <footer className="flex fixed bottom-4 max-w-md gap-4 -ml-4 w-full">
        <button className="btn btn-lg">Prev</button>
        <button className="btn btn-lg flex-1">Next Round</button>
      </footer>
    </div>
  );
};

export default RoundPage;
