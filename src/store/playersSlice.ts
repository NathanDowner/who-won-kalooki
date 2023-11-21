import { Player } from '@/models/player.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface PlayersSliceState {
  players: Player[];
}

const initialState: PlayersSliceState = {
  players: [
    {
      name: 'Nathan Dowenr',
      image:
        'https://lh3.googleusercontent.com/a/ACg8ocIFi7YpIJyNhHDiWZtjh953jvdQPBZsPLmUI9HRXXX7suwe=s96-c',
    },
    ...Array.from({ length: 6 }, (_, i) => ({
      name: `Player${i + 2}`,
      image: `https://avatar.iran.liara.run/public/boy?username=Player${i + 2}`,
    })),
  ],
};

export const playersSlice = createSlice({
  name: 'playersSlice',
  initialState,
  reducers: {
    bulkAddPlayers: (state, action: PayloadAction<Player[]>) => {
      state.players = action.payload;
    },

    clearPlayers: (state) => {
      state.players = [];
    },
  },
});

export const { bulkAddPlayers, clearPlayers } = playersSlice.actions;

export default playersSlice.reducer;

export const selectPlayers = (state: RootState) => state.playersSlice.players;
