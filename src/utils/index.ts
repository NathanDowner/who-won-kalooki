import { ROUNDS } from './constants';
export * from './formatters';

export const createUUID = () => {
  return crypto.randomUUID();
};

export const getNextRound = (round: string, reverseOrder = false) => {
  const roundIndex = ROUNDS.indexOf(round);
  if (roundIndex === -1) {
    throw new Error('Round not found');
  }

  if (reverseOrder) {
    if (roundIndex === 0) {
      return ROUNDS[0];
    }

    return ROUNDS[roundIndex - 1];
  }

  if (roundIndex === ROUNDS.length - 1) {
    return ROUNDS[ROUNDS.length - 1];
  }

  return ROUNDS[roundIndex + 1];
};

export const getOrdinalSuffix = (number: number) => {
  const lastDigit = number % 10;

  if (number > 10 && number < 20) {
    return 'th';
  }

  if (lastDigit === 1) {
    return 'st';
  }

  if (lastDigit === 2) {
    return 'nd';
  }

  if (lastDigit === 3) {
    return 'rd';
  }

  return 'th';
};

export const findNextRoundToPlay = (
  rounds: Record<string, number[]>,
): string => {
  const round = Object.keys(rounds).find((round) => {
    const scores = rounds[round];
    return scores.every((score) => score === 0);
  });

  return round || '333';
};

export const removeLeadingZero = (num: string): string => {
  return num.replace(/^0+/, '');
};

export const findLastRoundPlayed = (
  rounds: Record<string, number[]>,
): string => {
  const round = Object.keys(rounds)
    .reverse()
    .find((round) => {
      const scores = rounds[round];
      return scores.some((score) => score !== 0);
    });

  return round || '333';
};
