import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { bulkAddPlayers } from '@/store/playersSlice';
import { setInitialScores } from '@/store/scoreSlice';
import { storage } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';
import AddPlayersPage from './AddPlayersPage';
import { Player } from '@/models/player.interface';

const KalookiAddPlayerPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleStartRound = (players: Player[]) => {
    dispatch(bulkAddPlayers(players));
    dispatch(setInitialScores(players.length));
    storage.clearData(); // TODO: Remove when back btn is added
    storage.setPlayers(players);
    navigate(AppRoutes.round('333'));
  };

  return (
    <AddPlayersPage
      startGameBtnText="Start Round"
      onStartGame={handleStartRound}
    />
  );
};

export default KalookiAddPlayerPage;
