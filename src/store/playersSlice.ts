import { Player } from '@/models/player.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface PlayersSliceState {
  players: Player[];
}

const initialState: PlayersSliceState = {
  players: [],
};

export const playersSlice = createSlice({
  name: 'playersSlice',
  initialState,
  reducers: {
    bulkAddPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },
  },
});

export const { bulkAddPlayers } = playersSlice.actions;

export default playersSlice.reducer;

export const selectPlayers = (state: RootState) => state.playersSlice.players;
