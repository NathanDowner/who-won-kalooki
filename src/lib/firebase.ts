// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import {
  FieldPath,
  collection,
  doc,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { listConverter } from '@/models/list.interface';
import { listContributorConverter } from '@/models/contributor.interface';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Custom hooks

export const useGetList = (listId: string) =>
  useDocumentData(doc(db, 'lists', `${listId}`).withConverter(listConverter));

export const useGetListCollection = (listId: string) =>
  useCollectionData(
    collection(db, 'lists', `${listId}`).withConverter(listConverter),
    { initialValue: [] },
  );

export const useGetListContributors = (listId: string) =>
  useCollectionData(
    collection(db, 'lists', `${listId}`, 'contributors').withConverter(
      listContributorConverter,
    ),
    { initialValue: [] },
  );

export const useGetUserLists = (email: string) => {
  const path: FieldPath = new FieldPath('contributors', email);
  const q = query(collection(db, 'lists'), where(path, '!=', '')).withConverter(
    listConverter,
  );

  return useCollectionData(q, { initialValue: [] });
};
