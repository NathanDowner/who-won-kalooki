import { describe, it, expect } from 'vitest';
import { formatName, formatRound, getNextRound } from '.';

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
