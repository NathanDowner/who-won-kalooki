import { describe, expect, it } from 'vitest';
import reducer, { bulkAddPlayers, clearPlayers } from './playersSlice';
import { Player } from '@/models/player.interface';

describe('playerSlice', () => {
  it("should be empty by default if nothing's in local storage", () => {
    expect(reducer(undefined, { type: '' })).toEqual(
      expect.objectContaining({ players: [] }),
    );
  });

  it('should be able to bulk add players', () => {
    const initialState = { players: [] };
    const players: Player[] = [
      {
        name: 'James Arthur',
        id: '1',
        imgUrl: '',
        userName: 'jamesarthur',
      },
      {
        name: 'John Doe',
        id: '2',
        imgUrl: '',
        userName: 'johndoe',
      },
    ];

    expect(reducer(initialState, bulkAddPlayers(players))).toEqual(
      expect.objectContaining({ players }),
    );
  });

  it('should be able to clear all players', () => {
    const players: Player[] = [
      {
        name: 'James Arthur',
        id: '1',
        imgUrl: '',
        userName: 'jamesarthur',
      },
      {
        name: 'John Doe',
        id: '2',
        imgUrl: '',
        userName: 'johndoe',
      },
    ];

    const initialState = { players };

    expect(reducer(initialState, clearPlayers())).toEqual(
      expect.objectContaining({ players: [] }),
    );
  });
});
