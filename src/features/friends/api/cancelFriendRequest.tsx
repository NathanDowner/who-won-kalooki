import { db } from '@/lib/firebase';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { useUpdateDocument } from '@/hooks/useUpdateDocument';

const cancelFriendRequest = async (friendshipId: string) => {
  return deleteDoc(doc(collection(db, 'friends'), friendshipId));
};

export const useCancelFriendRequest = (onSuccess?: () => void) => {
  return useUpdateDocument<string, void>(cancelFriendRequest, {
    successNotificationText: 'Request cancelled!',
    onSuccess,
  });
};
