import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Friendship, friendshipConverter } from '../types/friend.interface';
import { useUpdateDocument } from '@/hooks/useUpdateDocument';

export type CreateFriendshipDto = Omit<
  Friendship,
  'createdAt' | 'updatedAt' | 'id'
>;

const sendFriendRequest = async (data: CreateFriendshipDto) => {
  console.log('calling sendFriendRequest');
  return setDoc(
    doc(collection(db, 'friends').withConverter(friendshipConverter)),
    data,
  );
};

export const useSendFriendRequest = (onSuccess?: () => void) => {
  return useUpdateDocument<CreateFriendshipDto, void>(sendFriendRequest, {
    successNotificationText: 'Friend request sent!',
    onSuccess,
  });
};
