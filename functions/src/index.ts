/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { getFirestore } from 'firebase-admin/firestore';
import { Game } from './models/game.interface';
import { UserProfile } from './models/userProfile.interface';
import { initializeApp } from 'firebase-admin/app';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
initializeApp();
const db = getFirestore();

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const updateWinLossCount = onDocumentWritten(
  'games/{gameId}',
  async (event) => {
    const snapshot = event.data?.after;

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
      const winnerData: UserProfile = (await winnerRef.get())
        .data as unknown as UserProfile;

      const gameWinsLosses = winnerData.games?.[type] ?? { wins: 0, losses: 0 };
      gameWinsLosses.wins += 1;

      logger.debug(`Winner stats for ${type}: ${gameWinsLosses}`);

      return winnerRef.set(
        {
          games: {
            [type]: gameWinsLosses,
          },
        },
        { merge: true },
      );

      // logger.log(`winner data: ${data}`);
    }
    return;
    // TODO: handle losers
  },
);

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from require("firebase-functions/v2/https");
// import * as logger from require("firebase-functions/logger");
// import {onDocumentCreated, onDocumentUpdated} from require("firebase-functions/v2/firestore");
// import {initializeApp} from require("firebase-admin/app");
// import {getFirestore} from require("firebase-admin/firestore");
// import {Game} from require("./models");

// initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript

// // export const helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });
