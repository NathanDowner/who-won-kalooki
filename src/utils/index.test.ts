import { describe, it, expect, beforeEach } from 'vitest';
import {
  findLastRoundPlayed,
  findNextRoundToPlay,
  formatName,
  formatRound,
  getNextRound,
  getOrdinalSuffix,
  removeLeadingZero,
  splitList,
} from '.';
import { INITIAL_SCORES } from './constants';

describe('formatName function', () => {
  it('should return the name if it is not more than one word', () => {
    const name = 'John';
    const formattedName = formatName(name);
    expect(formattedName).toEqual(name);
  });

  it('should return the first word of the name if it is more than one word', () => {
    const name = 'John Doe';
    const formattedName = formatName(name);
    expect(formattedName).toEqual('John');
  });
});

describe('formatRound function', () => {
  it('should split separate the charaters in the round by a dash', () => {
    const round = '333';
    const formattedRound = formatRound(round);

    expect(formattedRound).toEqual('3-3-3');
  });
});

describe('getNextRound function', () => {
  it('should return 334 after 333', () => {
    const round = '333';
    const nextRound = getNextRound(round);
    expect(nextRound).toEqual('334');
  });

  it('should return 344 after 334', () => {
    const round = '334';
    const nextRound = getNextRound(round);
    expect(nextRound).toEqual('344');
  });

  it('should return 444 after 344', () => {
    const round = '344';
    const nextRound = getNextRound(round);
    expect(nextRound).toEqual('444');
  });

  it('should return 3333 after 444', () => {
    const round = '444';
    const nextRound = getNextRound(round);
    expect(nextRound).toEqual('3333');
  });

  it('should return 3334 after 3333', () => {
    const round = '3333';
    const nextRound = getNextRound(round);
    expect(nextRound).toEqual('3334');
  });

  it('should return 3344 after 3334', () => {
    const round = '3334';
    const nextRound = getNextRound(round);
    expect(nextRound).toEqual('3344');
  });

  it('should return 3444 after 3344', () => {
    const round = '3344';
    const nextRound = getNextRound(round);
    expect(nextRound).toEqual('3444');
  });

  it('should return 4444 after 3444', () => {
    const round = '3444';
    const nextRound = getNextRound(round);
    expect(nextRound).toEqual('4444');
  });

  it("should throw an error for a round that doesn't exist", () => {
    const round = '123';
    expect(() => getNextRound(round)).toThrow('Round not found');
  });

  it('should return the same round if 4444 is the current round', () => {
    const round = '4444';
    const nextRound = getNextRound(round);
    expect(nextRound).toEqual(round);
  });

  it('should return the same round if 333 is the previous round', () => {
    const round = '333';
    const nextRound = getNextRound(round, true);
    expect(nextRound).toEqual(round);
  });

  it('should return 333 after 334 when in reverse order', () => {
    const round = '334';
    const nextRound = getNextRound(round, true);
    expect(nextRound).toEqual('333');
  });

  it('should return 334 after 344 when in reverse order', () => {
    const round = '344';
    const nextRound = getNextRound(round, true);
    expect(nextRound).toEqual('334');
  });

  it('should return 344 after 444 when in reverse order', () => {
    const round = '444';
    const nextRound = getNextRound(round, true);
    expect(nextRound).toEqual('344');
  });

  it('should return 444 after 3333 when in reverse order', () => {
    const round = '3333';
    const nextRound = getNextRound(round, true);
    expect(nextRound).toEqual('444');
  });

  it('should return 3333 after 3334 when in reverse order', () => {
    const round = '3334';
    const nextRound = getNextRound(round, true);
    expect(nextRound).toEqual('3333');
  });

  it('should return 3334 after 3344 when in reverse order', () => {
    const round = '3344';
    const nextRound = getNextRound(round, true);
    expect(nextRound).toEqual('3334');
  });

  it('should return 3344 after 3444 when in reverse order', () => {
    const round = '3444';
    const nextRound = getNextRound(round, true);
    expect(nextRound).toEqual('3344');
  });

  it('should return 3444 after 4444 when in reverse order', () => {
    const round = '4444';
    const nextRound = getNextRound(round, true);
    expect(nextRound).toEqual('3444');
  });
});

describe('getOrdinalSuffix function', () => {
  it('should return "st" for number 1', () => {
    const number = 1;
    const suffix = getOrdinalSuffix(number);
    expect(suffix).toEqual('st');
  });

  it('should return "nd" for number 2', () => {
    const number = 2;
    const suffix = getOrdinalSuffix(number);
    expect(suffix).toEqual('nd');
  });

  it('should return "rd" for number 3', () => {
    const number = 3;
    const suffix = getOrdinalSuffix(number);
    expect(suffix).toEqual('rd');
  });

  it('should return "th" for number 4', () => {
    const number = 4;
    const suffix = getOrdinalSuffix(number);
    expect(suffix).toEqual('th');
  });

  it('should return "th" for number 10', () => {
    const number = 10;
    const suffix = getOrdinalSuffix(number);
    expect(suffix).toEqual('th');
  });

  it('should return "th" for number 11', () => {
    const number = 11;
    const suffix = getOrdinalSuffix(number);
    expect(suffix).toEqual('th');
  });

  it('should return "th" for number 12', () => {
    const number = 12;
    const suffix = getOrdinalSuffix(number);
    expect(suffix).toEqual('th');
  });

  it('should return "th" for number 13', () => {
    const number = 13;
    const suffix = getOrdinalSuffix(number);
    expect(suffix).toEqual('th');
  });

  it('should return "th" for number 20', () => {
    const number = 20;
    const suffix = getOrdinalSuffix(number);
    expect(suffix).toEqual('th');
  });
});

describe('findNextRoundToPlay function', () => {
  let rounds: Record<string, number[]>;
  beforeEach(() => {
    rounds = INITIAL_SCORES;
  });

  it('should return 333 if all rounds are empty', () => {
    const round = findNextRoundToPlay(rounds);
    expect(round).toEqual('333');
  });

  it('should return 333 if all rounds are full', () => {
    rounds = {
      '333': [1, 2, 3],
      '334': [1, 2, 3],
      '344': [1, 2, 3],
      '444': [1, 2, 3],
      '3333': [1, 2, 3],
      '3334': [1, 2, 3],
      '3344': [1, 2, 3],
      '3444': [1, 2, 3],
      '4444': [1, 2, 3],
    };
    const round = findNextRoundToPlay(rounds);
    expect(round).toEqual('333');
  });

  it('should return the first round with all zeros', () => {
    rounds = {
      '333': [1, 2, 3],
      '334': [1, 2, 3],
      '344': [1, 2, 3],
      '444': [0, 0, 0],
      '3333': [0, 0, 0],
      '3334': [0, 0, 0],
      '3344': [0, 0, 0],
      '3444': [0, 0, 0],
      '4444': [0, 0, 0],
    };

    const round = findNextRoundToPlay(rounds);
    expect(round).toEqual('444');
  });
});

describe('removeLeadingZero function', () => {
  it('should remove leading zeros from a number string', () => {
    const num = '00123';
    const result = removeLeadingZero(num);
    expect(result).toEqual('123');
  });

  it('should return an empty string if the number string is empty', () => {
    const num = '';
    const result = removeLeadingZero(num);
    expect(result).toEqual('');
  });

  it('should return the same number if it does not have leading zeros', () => {
    const num = '123';
    const result = removeLeadingZero(num);
    expect(result).toEqual('123');
  });
});

describe('findLastRoundPlayed function', () => {
  it('should return 333 if no rounds have been played yet', () => {
    const rounds = {
      '333': [0, 0, 0],
      '334': [0, 0, 0],
      '344': [0, 0, 0],
      '444': [0, 0, 0],
      '3333': [0, 0, 0],
      '3334': [0, 0, 0],
      '3344': [0, 0, 0],
      '3444': [0, 0, 0],
      '4444': [0, 0, 0],
    };

    const round = findLastRoundPlayed(rounds);
    expect(round).toEqual('333');
  });

  it('should return 4444 if all rounds have been played', () => {
    const rounds = {
      '333': [1, 2, 3],
      '334': [1, 2, 3],
      '344': [1, 2, 3],
      '444': [1, 2, 3],
      '3333': [1, 2, 3],
      '3334': [1, 2, 3],
      '3344': [1, 2, 3],
      '3444': [1, 2, 3],
      '4444': [1, 2, 3],
    };

    const round = findLastRoundPlayed(rounds);
    expect(round).toEqual('4444');
  });

  it('should return the last round that was played', () => {
    const rounds = {
      '333': [1, 2, 3],
      '334': [1, 2, 3],
      '344': [1, 2, 3],
      '444': [0, 0, 0],
      '3333': [0, 0, 0],
      '3334': [0, 0, 0],
      '3344': [0, 0, 0],
      '3444': [0, 0, 0],
      '4444': [0, 0, 0],
    };

    const round = findLastRoundPlayed(rounds);
    expect(round).toEqual('344');
  });
});

describe('splitList function', () => {
  it('should return two empty arrays if the list is empty', () => {
    const list: string[] = [];

    const [list1, list2] = splitList(list);

    expect(list1.length).toBe(0);
    expect(list2.length).toBe(0);
  });

  it('should return only one array having a value if the list has one item', () => {
    const list: string[] = ['test 1'];

    const [list1, list2] = splitList(list);

    expect(list1.length).toBe(1);
    expect(list1[0]).toBe('test 1');
    expect(list2.length).toBe(0);
  });

  it('should evenly divide an even list', () => {
    const list: string[] = ['Mary', 'Martha', 'Matthew', 'Mark'];

    const [list1, list2] = splitList(list);

    expect(list1.length).toBe(2);
    expect(list2.length).toBe(2);
    expect(list1).toEqual(['Mary', 'Martha']);
    expect(list2).toEqual(['Matthew', 'Mark']);
  });

  it('should put the extra item in the first array for uneven lists', () => {
    const list: string[] = ['Mary', 'Martha', 'Matthew', 'Mark', 'Luke'];

    const [list1, list2] = splitList(list);

    expect(list1.length).toBe(3);
    expect(list2.length).toBe(2);
    expect(list1).toEqual(['Mary', 'Martha', 'Matthew']);
    expect(list2).toEqual(['Mark', 'Luke']);
  });
});
