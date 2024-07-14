import { db } from '@/lib/firebase';
import { profileConverter, UserProfile } from '@/models/user.model';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export const useGetUserProfile = (userId: string) => {
  // const q = query(collection(db, 'users'), where('id', '==', userId));

  return useDocumentData(
    doc(db, `users/${userId}`).withConverter(profileConverter),
  );
};

export async function getUserProfile(
  userId: string,
): Promise<UserProfile | undefined> {
  const userDocument = await getDoc(
    doc(db, `users/${userId}`).withConverter(profileConverter),
  );
  return userDocument.data();
}

export async function saveUserProfile(profile: UserProfile): Promise<string> {
  await setDoc(
    doc(db, 'users', profile.id).withConverter(profileConverter),
    profile,
  );
  return profile.id;
}

export async function findUsers(searchTerm: string): Promise<UserProfile[]> {
  const usersRef = collection(db, 'users').withConverter(profileConverter);
  const userQuery = query(
    usersRef,
    where('fullName', '>=', searchTerm),
    where('fullName', '<=', searchTerm + '\uf8ff'),
  );
  const usersCollection = await getDocs(userQuery);
  return usersCollection.docs.map((doc) => doc.data());
}
