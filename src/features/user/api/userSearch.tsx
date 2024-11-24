import { db } from '@/lib/firebase';
import { and, collection, getDocs, or, query, where } from 'firebase/firestore';
import { useUpdateDocument } from '@/hooks/useUpdateDocument';
import { profileConverter, UserProfile } from '@/models/user.model';

export type UserSearchDTO = {
  searchTerm: string;
};

async function findUsers(searchTerm: string): Promise<UserProfile[]> {
  const usersRef = collection(db, 'users').withConverter(profileConverter);
  const userQuery = query(
    usersRef,
    or(
      and(
        where('fullName', '>=', searchTerm),
        where('fullName', '<=', searchTerm + '\uf8ff'),
      ),
      and(
        where('userName', '>=', searchTerm),
        where('userName', '<=', searchTerm + '\uf8ff'),
      ),
    ),
  );
  const usersCollection = await getDocs(userQuery);
  return usersCollection.docs.map((doc) => doc.data());
}

export const useUserSearch = (onSuccess?: (data: UserProfile[]) => void) => {
  return useUpdateDocument<string, UserProfile[]>(findUsers, [], {
    onSuccess,
    showErrorToast: true,
  });
};
