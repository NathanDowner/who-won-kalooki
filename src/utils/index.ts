import toast from 'react-hot-toast';
import { ROUNDS } from './constants';
import { FirebaseError } from 'firebase/app';
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

export function splitList<T>(list: T[]): T[][] {
  let firstList: T[] = [];
  let secondList: T[] = [];
  if (list.length == 0) return [firstList, secondList];

  const splitIndex = list.length / 2;

  if (list.length % 2 == 0) {
    firstList = list.slice(0, splitIndex);
    secondList = list.slice(splitIndex);
  } else {
    firstList = list.slice(0, splitIndex + 1);
    secondList = list.slice(splitIndex + 1);
  }

  return [firstList, secondList];
}

export const withAsyncHandling = async <T = unknown>(
  promise: Promise<T>,
  successMessage: string = 'Success!',
): Promise<T | void> => {
  try {
    const resp: T = await promise;
    toast.success(successMessage || 'Success');
    return resp;
  } catch (error) {
    toast.error((error as FirebaseError).message);
  }
};

export const getPercentage = (num: number, total: number): number => {
  return (num / total) * 100;
};
