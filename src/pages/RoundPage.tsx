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
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import { PENALTY_AMOUNT } from '@/utils/constants';
import ScoreSheetPage from './ScoreSheetPage';
import Portal from '@/components/Portal';
import { Animations } from '@/components/animations';
import Keypad from '@/components/Keypad';
import AppHeader from '@/components/AppHeader';
import {
  ClipboardDocumentListIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import ConfirmationModal from '@/components/ConfirmationModal';

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

  const stopMovementToNextRound = useMemo(() => {
    let zeroCount = 0;
    for (const score of roundScores) {
      if (score === 0) {
        zeroCount++;
        if (zeroCount > 1) {
          return true;
        }
      }
    }
    return false;
  }, [roundScores]);

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

  const navigationBlocker = useBlocker(
    ({ nextLocation }) =>
      !nextLocation.pathname.startsWith('/round') &&
      nextLocation.pathname !== AppRoutes.finalScore,
  );

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
          showShadow
          leftActionBtn={{
            label: 'home button',
            icon: HomeIcon,
            type: 'link',
            link: AppRoutes.start,
          }}
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
            disabled={round! === '4444' || stopMovementToNextRound}
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

      <ConfirmationModal
        title="Abandon Game?"
        isOpen={navigationBlocker.state === 'blocked'}
        onClose={() => {}}
        cancelBtnText="Stay"
        confirmBtnText="Abandon game"
        onCancel={navigationBlocker.reset!}
        onConfirm={navigationBlocker.proceed!}
      >
        Are you sure you want to abandon this game? Your progress will not be
        saved.
      </ConfirmationModal>
    </>
  );
};

export default RoundPage;
