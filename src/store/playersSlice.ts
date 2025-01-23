import { Player } from '@/models/player.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { storage } from '@/utils/storage';

export interface PlayersSliceState {
  players: Player[];
}

const initialState: PlayersSliceState = {
  players: storage.getPlayers(),
};

export const playersSlice = createSlice({
  name: 'playersSlice',
  initialState,
  reducers: {
    bulkAddPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },

    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },

    clearPlayers: (state) => {
      state.players = [];
    },
  },
});

export const { bulkAddPlayers, clearPlayers } = playersSlice.actions;

export default playersSlice.reducer;

export const selectPlayers = (state: RootState) => state.playersSlice.players;
