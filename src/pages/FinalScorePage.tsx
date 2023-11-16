import ButtonContainer from '@/components/ButtonContainer';
import PlayerCard from '@/components/PlayerCard';
import { AppRoutes } from '@/routes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import { selectTotalsUpToRound, setInitialScores } from '@/store/scoreSlice';
import { useNavigate } from 'react-router-dom';

const FinalScorePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const players = useAppSelector(selectPlayers);
  const totalsSoFar = useAppSelector(selectTotalsUpToRound('4444'));

  const handleStartOver = () => {
    navigate(AppRoutes.start);
  };

  const handlePlayAgain = () => {
    dispatch(setInitialScores(players.length));
    navigate(AppRoutes.round('333'));
  };

  const lowestScore = Math.min(...totalsSoFar);

  return (
    <div className="page">
      <div className="space-y-4 mx-2">
        {players.map((player, idx) => (
          <PlayerCard
            key={idx}
            player={player}
            score={totalsSoFar[idx]}
            winner={totalsSoFar[idx] === lowestScore}
          />
        ))}
      </div>
      <ButtonContainer>
        <button className="btn btn-lg btn-outline" onClick={handlePlayAgain}>
          Play Again
        </button>
        <button className="btn btn-lg btn-outline" onClick={handleStartOver}>
          Start Over
        </button>
      </ButtonContainer>
    </div>
  );
};

export default FinalScorePage;
