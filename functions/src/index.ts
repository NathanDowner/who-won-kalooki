/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from 'firebase-functions/logger';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { getFirestore, WriteResult } from 'firebase-admin/firestore';
import { Game } from './models/game.interface';
import { initializeApp } from 'firebase-admin/app';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
initializeApp();
const db = getFirestore();

export const updateWinLossCount = onDocumentWritten(
  'games/{gameId}',
  async (event) => {
    const snapshot = event.data?.after;
    const promises: Promise<WriteResult>[] = [];

    if (!snapshot) {
      logger.info('No data associated with the event');
      return;
    }

    const gameData: Game = snapshot.data() as Game;
    logger.debug('Game data', gameData);
    const { winner, isComplete, players, type } = gameData;

    if (!isComplete) {
      logger.info('Game is incomplete. Exiting');
      return;
    }

    const winnerId = winner.id;
    const loserIds = players
      .filter((player) => player.id && player.id !== winner.id)
      .map((p) => p.id);

    logger.debug({ winnerId, loserIds });

    if (winnerId) {
      const winnerRef = await db.doc(`users/${winnerId}`);
      const winnerData = (await winnerRef.get()).data();

      const gameWinsLosses = winnerData?.games?.[type] ?? {
        wins: 0,
        losses: 0,
      };
      logger.debug('Winner profile', winnerData);

      gameWinsLosses.wins += 1;

      promises.push(
        winnerRef.set(
          {
            games: {
              [type]: gameWinsLosses,
            },
          },
          { merge: true },
        ),
      );
    }

    // Handle Losers
    loserIds.forEach(async (loserId) => {
      const loserRef = await db.doc(`users/${loserId}`);
      const loserData = (await loserRef.get()).data();

      const gameWinsLosses = loserData?.games?.[type] ?? {
        wins: 0,
        losses: 0,
      };
      logger.debug('Loser profile', loserData);

      gameWinsLosses.losses += 1;

      promises.push(
        loserRef.set(
          {
            games: {
              [type]: gameWinsLosses,
            },
          },
          { merge: true },
        ),
      );
    });

    return Promise.all(promises);
  },
);
