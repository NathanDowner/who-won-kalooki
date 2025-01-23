import { db } from '@/lib/firebase';
import { useAppDispatch } from '@/store/hooks';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Dispatch, useEffect } from 'react';
import { setFriends } from '../store/friendsSlice';
import {
  friendshipConverter,
  SimplifiedFriendshipInfo,
} from '../types/friend.interface';
import { toSimplifiedFriendship } from '../util';
import { AnyAction } from '@reduxjs/toolkit';
import { useAuth } from '@/contexts/AuthContext';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';

const subscribeToFriends = (dispatch: Dispatch<AnyAction>, userId: string) => {
  const q = query(
    collection(db, 'friends'),
    where('ids', 'array-contains', userId),
  ).withConverter(friendshipConverter);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const friends: SimplifiedFriendshipInfo[] = snapshot.docs.map((doc) => {
      return toSimplifiedFriendship(doc.data(), userId);
    });

    dispatch(setFriends(friends)); // Update Redux store
  });

  return unsubscribe; // Return unsubscribe function to clean up listener
};

function FriendListener() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      try {
        const unsubscribe = subscribeToFriends(dispatch, user.uid);
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
        if (error instanceof FirebaseError) {
          toast.error(error.message);
        } else {
          toast.error('Error loading friends');
        }
      }
    }
  }, [dispatch, user]);

  return null;
}

export default FriendListener;
