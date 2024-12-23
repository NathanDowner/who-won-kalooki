import RoundCard from '@/components/RoundCard';
import { AppRoutes } from '@/routes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import {
  selectRoundScores,
  selectTotalsUpToRound,
  setRoundScores as saveRoundScores,
  selectRounds,
} from '@/store/scoreSlice';
import { formatRound, getNextRound } from '@/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import { PENALTY_AMOUNT } from '@/utils/constants';
import ScoreSheetPage from '../../../pages/ScoreSheetPage';
import Portal from '@/components/Portal';
import { Animations } from '@/components/animations';
import Keypad from '@/components/Keypad';
import AppHeader from '@/components/AppHeader';
import {
  ClipboardDocumentListIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import ConfirmationModal from '@/components/ConfirmationModal';
import clsx from 'clsx';
import { storage } from '@/utils/storage';
import { useAuth } from '@/contexts/AuthContext';
import { useSaveGame } from '../api/saveGame';
import { useUpdateGame } from '../api/updateGame';
import { Timestamp } from 'firebase/firestore';
import { hasUserName } from '../utils';
import { GameType } from '@/models/gameType.enum';
import Button from '@/components/Button';
import Loader from '@/components/Loader';

const RoundPage = () => {
  const { round } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const storeGameId = (id: string) => {
    setGameId(id);
    storage.setGameId(id);
  };

  const { execute: saveGame, isLoading: savingGame } = useSaveGame(storeGameId);
  const { execute: updateGame, isLoading: updatingGame } = useUpdateGame();

  const players = useAppSelector(selectPlayers);
  const currentRoundScores = useAppSelector(selectRoundScores(round!));
  const totalsSoFar = useAppSelector(selectTotalsUpToRound(round!));
  const rounds = useAppSelector(selectRounds);

  const [roundScores, setRoundScores] = useState<number[]>(currentRoundScores);
  const [someoneRewarded, setSomeoneRewarded] = useState(false);
  const [showScoreSheet, setShowScoreSheet] = useState(false);
  const roundCardRefs = useRef<HTMLDivElement[]>([]);
  const [gameId, setGameId] = useState(storage.getGameId());

  const [selectedCardIdx, setSelectedCardIdx] = useState<null | number>(null);
  const [showKeypad, setShowKeypad] = useState(false);

  const lowestScore = useMemo(() => Math.min(...totalsSoFar), [totalsSoFar]);

  const isSavingGame = useMemo(
    () => savingGame || updatingGame,
    [savingGame, updatingGame],
  );

  useEffect(() => {
    storage.setScores(rounds);
  }, [rounds]);

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
      !nextLocation.pathname.startsWith('/kalooki/round') &&
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

  const saveScores = async () => {
    const lowestScore = Math.min(...totalsSoFar); // totals don't include current round scores
    const newTotals = totalsSoFar.map(
      (_, idx) => totalsSoFar[idx] + roundScores[idx],
    );
    const winningIndex = newTotals.indexOf(lowestScore);
    const winner = players[winningIndex];
    const creator = players.find((player) => player.id === user?.uid)!;
    const playerUserNames = players.filter(hasUserName).map((p) => p.userName!);
    const endedAt = Timestamp.now();
    const scores = { ...rounds, [round!]: roundScores };

    if (!user) return;

    if (!gameId) {
      await saveGame({
        type: GameType.Kalooki,
        players,
        creator,
        scores,
        winner,
        endedAt,
        isComplete: false,
        playerUserNames,
      });
    } else {
      await updateGame({
        id: gameId,
        scores,
        winner,
        isComplete: Math.max(...rounds['4444']) !== 0,
        endedAt,
        players,
        playerUserNames,
      });
    }
  };

  const handleNextRound = async () => {
    submitRound();
    setSomeoneRewarded(false);
    await saveScores();
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

  const scrollToRoundCard = (index: number, offset: number = -50) => {
    if (roundCardRefs.current[index]) {
      setTimeout(() => {
        const element = roundCardRefs.current[index];
        const container = element.parentElement; // Assuming the container is the parent element

        if (container) {
          const elementTop = element.offsetTop;
          const containerTop = container.offsetTop;
          const scrollPosition = elementTop - containerTop + offset;

          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth',
          });
        }
      }, 0);
    }
  };

  const handleFocusRoundCard = (index: number) => {
    scrollToRoundCard(index);
    handleOpenKeypad(index);
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
        <div className={clsx('grid grid-cols-2 gap-6', showKeypad && 'pb-80')}>
          {players.map((player, idx) => (
            <RoundCard
              key={idx}
              ref={(el) => (roundCardRefs.current[idx] = el!)}
              isLeading={round !== '333' && totalsSoFar[idx] === lowestScore}
              player={player}
              setScore={(score: number) => setScore(idx, score)}
              scoreSoFar={totalsSoFar[idx]}
              disableReward={someoneRewarded}
              onReward={() => handleReward(idx)}
              currentRoundScore={roundScores[idx]}
              onOpenKeypad={() => handleFocusRoundCard(idx)}
            />
          ))}
          {/* <div className="rounded-md border-4 flex flex-col items-center justify-center text-2xl min-h-[212px] border-black border-dashed hover:border-solid">
            <div className="text-4xl">+</div> <div>Add Player</div>
          </div> */}
        </div>
        <footer className="button-container">
          <Button
            disabled={round! === '333'}
            onClick={handlePrevRound}
            size="lg"
            className="flex-[2]"
          >
            Prev
          </Button>
          <Button onClick={handleEndGame} size="lg" className="flex-1">
            {round === '4444' ? 'End Game' : 'Save Game'}
          </Button>
          <Button
            disabled={round! === '4444' || stopMovementToNextRound}
            onClick={handleNextRound}
            size="lg"
            className="flex-[2]"
          >
            Next Round
          </Button>
        </footer>
      </div>
      <Portal>
        <Animations.SlideUp withBackground={false} show={showKeypad}>
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
      <Loader isLoading={isSavingGame} text="Saving Round" />
    </>
  );
};

export default RoundPage;
