import { configureStore } from '@reduxjs/toolkit';
import scoreSlice from './scoreSlice';
import playersSlice from './playersSlice';
import { friendsSlice } from '@/features/friends';

export const store = configureStore({
  reducer: {
    scoreSlice,
    playersSlice,
    friendsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
