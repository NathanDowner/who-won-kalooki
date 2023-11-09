import { configureStore } from '@reduxjs/toolkit';
import guestList from './guestListSlice';

export const store = configureStore({
  reducer: {
    guestList,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
