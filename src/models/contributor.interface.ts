import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { Guest } from './guest.interface';
import { Role } from './role.enum';

export interface Contributor {
  name: string;
  email: string;
  role: Role;
  photoURL?: string;
}

export type ListContributor = {
  name: string;
  email: string;
  guests: Guest[];
  id: string;
};

export const listContributorConverter: FirestoreDataConverter<ListContributor> =
  {
    toFirestore(contributor: WithFieldValue<ListContributor>): DocumentData {
      return {
        name: contributor.name,
        email: contributor.email,
        guests: contributor.guests,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions,
    ): ListContributor {
      const data = snapshot.data(options);
      return {
        id: snapshot.id,
        name: data.name,
        email: data.email,
        guests: data.guests,
      };
    },
  };

// export type CreateContributorDto = Omit<Contributor, 'photo'>;
