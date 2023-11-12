import { configureStore } from '@reduxjs/toolkit';
import playersSlice from './playersSlice';

export const store = configureStore({
  reducer: {
    playersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
