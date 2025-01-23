import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Friendship, friendshipConverter } from '../types/friend.interface';
import { useUpdateDocument } from '@/hooks/useUpdateDocument';

export type CreateFriendshipDto = Omit<
  Friendship,
  'createdAt' | 'updatedAt' | 'id'
>;

const sendFriendRequest = async (
  data: CreateFriendshipDto,
): Promise<string> => {
  const friendshipRef = doc(
    collection(db, 'friends').withConverter(friendshipConverter),
  );
  await setDoc(friendshipRef, data);
  return friendshipRef.id;
};

export const useSendFriendRequest = (onSuccess?: () => void) => {
  return useUpdateDocument<CreateFriendshipDto, string>(sendFriendRequest, {
    successNotificationText: 'Friend request sent!',
    onSuccess,
  });
};
