import { ROUNDS } from './constants';

export const createUUID = () => {
  return crypto.randomUUID();
};

export const formatName = (name: string) => {
  const nameParts = name.split(' ');
  if (nameParts.length === 2) {
    return nameParts[0];
  }
  return name;
};

export const formatRound = (round: string) => {
  return round.split('').join('-');
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
