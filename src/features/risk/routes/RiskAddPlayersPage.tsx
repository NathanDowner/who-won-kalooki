import { Player } from '@/models/player.interface';
import AddPlayersPage from '@/pages/AddPlayersPage';
import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { bulkAddPlayers } from '@/store/playersSlice';
import { storage } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';

const RiskAddPlayersPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleStartGame = (players: Player[]) => {
    dispatch(bulkAddPlayers(players));
    storage.clearData();
    navigate(AppRoutes.risk.round);
  };

  return <AddPlayersPage onStartGame={handleStartGame} />;
};

export default RiskAddPlayersPage;
