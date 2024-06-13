import ButtonContainer from '@/components/ButtonContainer';
import RoundCard from '@/components/RoundCard';
import { AppRoutes } from '@/routes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import {
  selectRoundScores,
  selectTotalsUpToRound,
  setRoundScores as saveRoundScores,
} from '@/store/scoreSlice';
import { formatRound, getNextRound } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PENALTY_AMOUNT } from '@/utils/constants';
import ScoreSheetPage from './ScoreSheetPage';
import Portal from '@/components/Portal';
import { Animations } from '@/components/animations';
import Keypad from '@/components/Keypad';
import AppHeader from '@/components/AppHeader';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const RoundPage = () => {
  const { round } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const players = useAppSelector(selectPlayers);
  const currentRoundScores = useAppSelector(selectRoundScores(round!));
  const totalsSoFar = useAppSelector(selectTotalsUpToRound(round!));

  const [roundScores, setRoundScores] = useState<number[]>(currentRoundScores);
  const [someoneRewarded, setSomeoneRewarded] = useState(false);
  const [showScoreSheet, setShowScoreSheet] = useState(false);

  const [selectedCardIdx, setSelectedCardIdx] = useState<null | number>(null);
  const [showKeypad, setShowKeypad] = useState(false);

  const lowestScore = useMemo(() => Math.min(...totalsSoFar), [totalsSoFar]);

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
    navigate(AppRoutes.finalScore);
  };

  const handleOpenKeypad = (idx: number) => {
    setSelectedCardIdx(idx);
    setShowKeypad(true);
  };

  const handleCloseKeypad = (value: string) => {
    if (selectedCardIdx !== null) {
      setScore(selectedCardIdx, parseInt(value));
    }

    setSelectedCardIdx(null);
    setShowKeypad(false);
  };

  return (
    <>
      <div className="page">
        <AppHeader
          title={`Round ${formatRound(round!)}`}
          rightActionBtn={{
            label: 'sheet button',
            icon: ClipboardDocumentListIcon,
            type: 'button',
            onClick: () => setShowScoreSheet(true),
          }}
        />

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
              onOpenKeypad={() => handleOpenKeypad(idx)}
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
      <Portal>
        <Animations.SlideUp show={showKeypad}>
          <Keypad
            initialValue={
              selectedCardIdx !== null
                ? roundScores[selectedCardIdx].toString()
                : '0'
            }
            onClose={handleCloseKeypad}
          />
        </Animations.SlideUp>

        <Animations.SlideUp show={showScoreSheet}>
          <ScoreSheetPage onClose={() => setShowScoreSheet(false)} />
        </Animations.SlideUp>
      </Portal>
    </>
  );
};

export default RoundPage;
