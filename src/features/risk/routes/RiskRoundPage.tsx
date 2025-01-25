import { Animations } from '@/components/animations';
import AppHeader from '@/components/AppHeader';
import Button from '@/components/Button';
import ConfirmationModal from '@/components/ConfirmationModal';
import Keypad from '@/components/Keypad';
import Portal from '@/components/Portal';
import { AppRoutes } from '@/routes';
import { useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import { CalculatorIcon, HomeIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useBlocker } from 'react-router-dom';
import RiskPlayerCard from '../components/RiskPlayerCard';
import clsx from 'clsx';
import RiskBattle from '@/components/RiskBattle';

const RiskRoundPage = () => {
  const players = useAppSelector(selectPlayers);
  const [showKeypad, setShowKeypad] = useState(false);
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
  const roundCardRefs = React.useRef<HTMLDivElement[]>([]);

  const [territoryCounts, setTerritoryCounts] = useState<number[]>(() =>
    Array(players.length).fill(0),
  );

  const [currentDefenderIdx, setCurrentDefenderIdx] = useState<number | null>(
    null,
  );
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);

  const handleNextTurn = () => {
    setCurrentPlayerIdx((prev) => (prev + 1) % players.length);
  };

  const handleOpenKeypad = (idx?: number) => {
    console.log('handleOpenKeypad', idx);
    if (idx !== undefined) {
      setSelectedCardIdx(idx);
    }
    setShowKeypad(true);
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

  const setTerritories = (idx: number, count: number) => {
    setTerritoryCounts((prev) => {
      const newTerritoryCounts = [...prev];
      newTerritoryCounts[idx] = count;
      return newTerritoryCounts;
    });
  };

  const handleCloseKeypad = (value: string) => {
    if (selectedCardIdx !== null) {
      setTerritories(selectedCardIdx, parseInt(value));
    }

    setSelectedCardIdx(null);
    setShowKeypad(false);
  };

  const handleBattleEnd = (winningIndex: number) => {
    if (winningIndex === currentPlayerIdx) {
      // Player won the battle
      setTerritories(currentPlayerIdx, territoryCounts[currentPlayerIdx] + 1);
      setTerritories(
        currentDefenderIdx!,
        territoryCounts[currentDefenderIdx!] - 1,
      );
      setCurrentDefenderIdx(null);
    } else {
      setTerritories(currentPlayerIdx, territoryCounts[currentPlayerIdx] - 1);
      setTerritories(
        currentDefenderIdx!,
        territoryCounts[currentDefenderIdx!] + 1,
      );
      setCurrentDefenderIdx(null);
    }
  };

  const navigationBlocker = useBlocker(
    ({ nextLocation }) => !nextLocation.pathname.startsWith('/risk/round/'),
  );
  return (
    <>
      <div className="page">
        <AppHeader
          title="Risk Round"
          showShadow
          leftActionBtn={{
            label: 'home button',
            icon: HomeIcon,
            type: 'link',
            link: AppRoutes.start,
          }}
        />

        <div className={clsx('grid grid-cols-2 gap-6', showKeypad && 'pb-80')}>
          {players.map((player, idx) => (
            <RiskPlayerCard
              key={idx}
              player={player}
              ref={(el) => (roundCardRefs.current[idx] = el!)}
              isPlayerTurn={currentPlayerIdx === idx}
              onOpenKeypad={() => handleFocusRoundCard(idx)}
              territoryCount={territoryCounts[idx]}
              onDefend={() => setCurrentDefenderIdx(idx)}
            />
          ))}
        </div>

        {currentDefenderIdx !== null && (
          <>
            <RiskBattle
              attacker={players[currentPlayerIdx]}
              attackerIdx={currentPlayerIdx}
              defenderIdx={currentDefenderIdx}
              defender={players[currentDefenderIdx]}
              onBattleEnd={handleBattleEnd}
              onCancel={() => setCurrentDefenderIdx(null)}
            />
          </>
        )}

        <footer className="button-container">
          <Button size="lg" className="flex-[1]">
            End
          </Button>
          <Button size="lg" className="flex-4" onClick={handleNextTurn}>
            Next Turn
          </Button>
          <Button
            size="lg"
            className="flex-[1]"
            onClick={() => handleOpenKeypad()}
          >
            <CalculatorIcon className="h-6" />
          </Button>
        </footer>
      </div>

      <Portal>
        <Animations.SlideUp withBackground={false} show={showKeypad}>
          <Keypad
            initialValue={
              selectedCardIdx !== null
                ? territoryCounts[selectedCardIdx].toString()
                : '0'
            }
            onClose={handleCloseKeypad}
          />
        </Animations.SlideUp>

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
      </Portal>
    </>
  );
};

export default RiskRoundPage;
