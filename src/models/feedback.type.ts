import {
  DocumentData,
  FirestoreDataConverter,
  serverTimestamp,
  Timestamp,
  WithFieldValue,
} from 'firebase/firestore';

export enum FeedbackType {
  Review = 'review',
  Suggestion = 'suggestion',
  Bug = 'bug',
  Other = 'other',
}

export type Feedback = {
  id: string;
  feedback: string;
  createdAt: Timestamp;
  feedbackType: FeedbackType | undefined;
  name: string;
  email: string;
  userId?: string;
};

export type CreateFeedbackDto = Omit<Feedback, 'id' | 'createdAt'>;

export const messageConverter: FirestoreDataConverter<Feedback> = {
  toFirestore(message: WithFieldValue<CreateFeedbackDto>): DocumentData {
    return {
      feedback: message.feedback,
      createdAt: serverTimestamp(),
      feedbackType: message.feedbackType,
      name: message.name,
      email: message.email,
      userId: message.userId,
    };
  },
  fromFirestore(snapshot, options): Feedback {
    const data = snapshot.data(options)!;
    return {
      id: snapshot.id,
      feedback: data.feedback,
      createdAt: data.createdAt,
      feedbackType: data.feedbackType,
      name: data.name,
      email: data.email,
      userId: data.userId,
    };
  },
};
