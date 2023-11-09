import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import { Contributor } from './contributor.interface';
import { Guest } from './guest.interface';

export type List = {
  id: string;
  contributors: Record<string, Contributor>;
  title: string;
  author: string;
  guests: Guest[];
};

export type CreateListDto = Omit<List, 'id'>;

export const listConverter: FirestoreDataConverter<List> = {
  toFirestore(list: WithFieldValue<List>): DocumentData {
    return {
      contributors: list.contributors,
      title: list.title,
      guests: list.guests,
      author: list.author,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): List {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      author: data.author,
      contributors: data.contributors,
      guests: data.guests,
    };
  },
};
