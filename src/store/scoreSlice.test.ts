import { expect, it } from 'vitest';
import reducer, {
  setRoundScores,
  setInitialScores,
  bulkSetRoundScores,
  resetScores,
} from './scoreSlice';
import { INITIAL_SCORES } from '@/utils/constants';

it('should be empty by default', () => {
  expect(reducer(undefined, { type: '' })).toEqual(
    expect.objectContaining({ rounds: INITIAL_SCORES }),
  );
});

it.todo('should be able to set round scores');

it.todo('should be able to set initial scores');

it.todo('should be able to bulk set round scores');

it('should be able to reset scores', () => {
  const initialScores: Record<string, number[]> = {
    '333': [0, 50, 100],
    '334': [0, 12, 3],
    '344': [56, 0, 23],
    '444': [23, 13, 0],
    '3333': [83, 0, 42],
    '3334': [83, 0, 42],
    '3344': [83, 0, 42],
    '3444': [83, 0, 42],
    '4444': [83, 0, 42],
  };

  const initialState = { rounds: initialScores };

  expect(reducer(initialState, resetScores())).toEqual(
    expect.objectContaining({ rounds: INITIAL_SCORES }),
  );
});
