import { db } from '@/lib/firebase';
import { friendshipConverter } from '@/features/friends/types/friend.interface';
import { collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//   return useCollectionData(q, { initialValue: [] });
// };

export const useGetFriends = (userId: string) => {
  const q = query(
    collection(db, 'friends'),
    where('ids', 'array-contains', userId),
  ).withConverter(friendshipConverter);

  return useCollectionData(q, { initialValue: [] });
};
