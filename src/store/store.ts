import { configureStore } from '@reduxjs/toolkit';
import scoreSlice from './scoreSlice';
import playersSlice from './playersSlice';

export const store = configureStore({
  reducer: {
    scoreSlice,
    playersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
