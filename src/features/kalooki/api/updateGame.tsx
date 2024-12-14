import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useUpdateDocument } from '@/hooks/useUpdateDocument';
import { UpdateGameDto } from '@/models/game.interface';

const updateGame = async (game: UpdateGameDto) => {
  await setDoc(doc(db, 'games', game.id), game, {
    mergeFields: ['scores', 'winner', 'isComplete', 'endedAt'],
  });
  return game.id;
};

export const useUpdateGame = (onSuccess?: () => void) => {
  return useUpdateDocument<UpdateGameDto, string>(updateGame, {
    notificationDuration: 2000,
    onSuccess,
  });
};
