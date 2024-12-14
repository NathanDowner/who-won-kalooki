import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useUpdateDocument } from '@/hooks/useUpdateDocument';
import { CreateGameDto, gameConverter } from '@/models/game.interface';

const saveGame = async (game: CreateGameDto): Promise<string> => {
  const docRef = await addDoc(
    collection(db, 'games').withConverter(gameConverter),
    game,
  );
  return docRef.id;
};

export const useSaveGame = (onSuccess?: () => void) => {
  return useUpdateDocument<CreateGameDto, string>(saveGame, {
    successNotificationText: '',
    onSuccess,
  });
};
