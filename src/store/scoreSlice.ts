import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface ScoreSliceState {
  rounds: Record<string, number[]>;
}

export interface SetRoundScorePayload {
  round: string;
  scores: number[];
}

const initialState: ScoreSliceState = {
  rounds: {
    '333': [],
    '334': [],
    '344': [],
    '444': [],
    '3333': [],
    '3334': [],
    '3344': [],
    '3444': [],
    '4444': [],
  },
};
export const scoreSlice = createSlice({
  name: 'scoreSlice',
  initialState,
  reducers: {
    setRoundScores: (state, action: PayloadAction<SetRoundScorePayload>) => {
      const { round, scores } = action.payload;
      state.rounds[round] = scores;
    },

    setInitialScores: (state, action: PayloadAction<number>) => {
      const numOfPlayers = action.payload;

      const rounds = Object.keys(state.rounds);
      // set an array of length numOfPlayers for each round in rounds
      rounds.forEach((round) => {
        state.rounds[round] = Array.from({ length: numOfPlayers }, () => 0);
      });
    },

    resetScores: (state) => {
      const rounds = Object.keys(state.rounds);
      rounds.forEach((round) => {
        state.rounds[round] = [];
      });
    },
  },
});

export const { setRoundScores, setInitialScores, resetScores } =
  scoreSlice.actions;

export default scoreSlice.reducer;

export const selectRoundScores = (round: string) => (state: RootState) =>
  state.scoreSlice.rounds[round];

export const selectRounds = (state: RootState) => state.scoreSlice.rounds;

/**
 * Selects the totals up to but not including a specific round from the state.
 * @param round - The round up to which the totals should be calculated.
 * @param includeRound - Whether or not to include the round in the totals.
 * @param state - The root state of the application.
 * @returns An array of totals for each player up to the specified round.
 */
export const selectTotalsUpToRound =
  (round: string, includeRound = false) =>
  (state: RootState) => {
    const rounds = Object.keys(state.scoreSlice.rounds);
    const roundIndex = rounds.indexOf(round);
    const endIndex = includeRound ? roundIndex + 1 : roundIndex;
    const roundsInQuestion = rounds.slice(0, endIndex);

    if (roundsInQuestion.length === 0)
      return Array.from({ length: state.playersSlice.players.length }, () => 0);

    const rowTotals: number[][] = roundsInQuestion.map((round) => {
      return state.scoreSlice.rounds[round];
    });

    const totals: number[] = rowTotals.reduce((acc, row) => {
      return acc.map((val, i) => val + row[i]);
    });
    return totals;
  };
