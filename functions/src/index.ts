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
import { onDocumentCreated, onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Game } from './models';

initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const updateWinLossCount = onDocumentCreated('games/{gameId}', async (event) => {
  logger.log('Game created', event.data);
  const data: Game | undefined  = event.data?.data() as Game;
  const { winner, isComplete, players} = data;

  if (isComplete) {
    const loserIds = players.filter(player => player.id).map(p => p.id);
    const winnerId = winner.id

    if (winnerId) {
    const winner =  await getFirestore().doc(`users/${winnerId}`);
    const data = await winner.get();
    data.data

    }

  }
});
