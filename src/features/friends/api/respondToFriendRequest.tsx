import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useUpdateDocument } from '@/hooks/useUpdateDocument';
import {
  friendshipConverter,
  FriendshipStatus,
} from '../types/friend.interface';

export type UpdateFriendRequestDto = {
  friendshipId: string;
  status: FriendshipStatus;
};

const updateFriendRequest = async (data: UpdateFriendRequestDto) => {
  const { friendshipId, status } = data;
  return setDoc(
    doc(collection(db, 'friends'), friendshipId).withConverter(
      friendshipConverter,
    ),
    { status },
    { merge: true },
  );
};

export const useRespondToFriendRequest = (onSuccess?: () => void) => {
  return useUpdateDocument<UpdateFriendRequestDto, void>(updateFriendRequest, {
    onSuccess,
  });
};
