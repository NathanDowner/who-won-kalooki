import ButtonContainer from '@/components/ButtonContainer';
import RoundCard from '@/components/RoundCard';
import { useTitle } from '@/contexts/TitleContext';
import { AppRoutes } from '@/routes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import {
  selectRoundScores,
  selectTotalsUpToRound,
  setRoundScores as saveRoundScores,
  setInitialScores,
} from '@/store/scoreSlice';
import { formatRound, getNextRound } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FinalScorePage from './FinalScorePage';
import { PENALTY_AMOUNT } from '@/utils/constants';
import ScoreSheetPage from './ScoreSheetPage';
import Portal from '@/components/Portal';
import { Animations } from '@/components/animations';
import { useKeypad } from '@/contexts/KeypadContext';
import Keypad from '@/components/Keypad';

const RoundPage = () => {
  const { round } = useParams();
  const { setTitle } = useTitle();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const players = useAppSelector(selectPlayers);
  const currentRoundScores = useAppSelector(selectRoundScores(round!));
  const totalsSoFar = useAppSelector(selectTotalsUpToRound(round!));

  const [roundScores, setRoundScores] = useState<number[]>(currentRoundScores);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [someoneRewarded, setSomeoneRewarded] = useState(false);
  const [scoreSheetOpen, setScoreSheetOpen] = useState(false);

  const { value: initialValue, isVisible, onCloseKeypad } = useKeypad();

  const lowestScore = useMemo(() => Math.min(...totalsSoFar), [totalsSoFar]);

  useEffect(() => {
    setTitle(`Round ${formatRound(round!)}`);
  }, [round]);

  useEffect(() => {
    setRoundScores(currentRoundScores);
  }, [currentRoundScores]);

  const setScore = (idx: number, score: number) => {
    setRoundScores((prev) => {
      const newScores = [...prev];
      newScores[idx] = score;
      return newScores;
    });
  };

  const handleReward = (idx: number) => {
    if (someoneRewarded) return;

    setSomeoneRewarded(true);
    setScore(idx, roundScores[idx] - PENALTY_AMOUNT);
  };

  const submitRound = () => {
    dispatch(saveRoundScores({ round: round!, scores: roundScores }));
  };

  const handleNextRound = () => {
    submitRound();
    setSomeoneRewarded(false);
    navigate(AppRoutes.round(getNextRound(round!)));
  };

  const handlePrevRound = () => {
    navigate(AppRoutes.round(getNextRound(round!, true)));
  };

  const handleEndGame = () => {
    submitRound();
    setIsGameFinished(true);
  };

  const handlePlayAgain = () => {
    dispatch(setInitialScores(players.length));
    setIsGameFinished(false);
    navigate(AppRoutes.round('333'));
  };

  const handleStartOver = () => {
    navigate(AppRoutes.start);
  };

  return (
    <>
      {isGameFinished ? (
        <FinalScorePage
          onShowScoreSheet={() => setScoreSheetOpen(true)}
          onPlayAgain={handlePlayAgain}
          onStartOver={handleStartOver}
        />
      ) : (
        <div className="page">
          <header className="text-center mb-4 relative">
            <h1 className="text-2xl">{round}</h1>{' '}
            <button
              onClick={() => setScoreSheetOpen(true)}
              className="absolute btn btn-sm right-0 top-0"
            >
              sheet
            </button>
          </header>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-6">
            {players.map((player, idx) => (
              <RoundCard
                key={idx}
                isLeading={round !== '333' && totalsSoFar[idx] === lowestScore}
                player={player}
                setScore={(score: number) => setScore(idx, score)}
                scoreSoFar={totalsSoFar[idx]}
                disableReward={someoneRewarded}
                onReward={() => handleReward(idx)}
                currentRoundScore={roundScores[idx]}
              />
            ))}
            {/* <div className="rounded-md border-4 flex flex-col items-center justify-center text-2xl min-h-[212px] border-black border-dashed hover:border-solid">
              <div className="text-4xl">+</div> <div>Add Player</div>
            </div> */}
          </div>
          <ButtonContainer>
            <button
              disabled={round! === '333'}
              onClick={handlePrevRound}
              className="btn btn-lg flex-[2]"
            >
              Prev
            </button>
            <button onClick={handleEndGame} className="btn btn-lg flex-1">
              End Game
            </button>
            <button
              disabled={round! === '4444'}
              onClick={handleNextRound}
              className="btn btn-lg flex-[2]"
            >
              Next Round
            </button>
          </ButtonContainer>
        </div>
      )}
      <Portal>
        <Animations.SlideUp show={isVisible}>
          <Keypad initialValue={initialValue} onClose={onCloseKeypad} />
        </Animations.SlideUp>

        <Animations.SlideUp show={scoreSheetOpen}>
          <ScoreSheetPage onClose={() => setScoreSheetOpen(false)} />
        </Animations.SlideUp>
      </Portal>
    </>
  );
};

export default RoundPage;
