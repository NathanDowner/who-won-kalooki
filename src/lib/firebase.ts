// Import the functions you need from the SDKs you need
import { CreateGameDto, gameConverter } from '@/models/game.interface';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  where,
  and,
  query,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
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

export const saveGame = async (game: CreateGameDto): Promise<string> => {
  const docRef = await addDoc(
    collection(db, 'games').withConverter(gameConverter),
    game,
  );
  console.log('Document written with ID: ', docRef.id);
  return docRef.id;
};

export const useGetPreviousGames = (userId: string) => {
  const q = query(
    collection(db, 'games'),
    and(where('creator.id', '==', userId), where('isComplete', '==', false)),
  ).withConverter(gameConverter);

  return useCollectionData(q, { initialValue: [] });
};
