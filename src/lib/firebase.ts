// Import the functions you need from the SDKs you need
import {
  CreateGameDto,
  gameConverter,
  UpdateGameDto,
} from '@/models/game.interface';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  where,
  query,
  setDoc,
  deleteDoc,
  doc,
  orderBy,
  connectFirestoreEmulator,
  initializeFirestore,
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
initializeFirestore(app, { ignoreUndefinedProperties: true });
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export const saveGame = async (game: CreateGameDto): Promise<string> => {
  const docRef = await addDoc(
    collection(db, 'games').withConverter(gameConverter),
    game,
  );
  return docRef.id;
};

export const useGetPreviousGames = (userName: string) => {
  const q = query(
    collection(db, 'games'),
    where('playerUserNames', 'array-contains', userName),
    orderBy('endedAt', 'desc'),
  ).withConverter(gameConverter);

  return useCollectionData(q, { initialValue: [] });
};

export const updateGame = async (game: UpdateGameDto) => {
  await setDoc(doc(db, 'games', game.id), game, {
    mergeFields: ['scores', 'winner', 'isComplete', 'endedAt'],
  });
  return game.id;
};

export const deleteGame = async (gameId: string) => {
  await deleteDoc(doc(db, 'games', gameId));
};
