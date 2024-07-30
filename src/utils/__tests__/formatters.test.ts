import { formatName, formatRound, toSentenceCase } from '../formatters';
import { describe, it, expect } from 'vitest';

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

describe('toSentenceCase function', () => {
  it('should return the string with the first letter capitalized', () => {
    const str = 'hello';
    const result = toSentenceCase(str);
    expect(result).toEqual('Hello');
  });

  it('should leave the string unchanged if it is already in sentence case', () => {
    const str = 'Hello';
    const result = toSentenceCase(str);
    expect(result).toEqual('Hello');
  });
});
