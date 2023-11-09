import { FirebaseError } from 'firebase/app';
import { Firestore, SetOptions, doc, setDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';

export function useUpdateDocument<TData>(db: Firestore): {
  error: FirebaseError | null;
  isLoading: boolean;
  updateDocument: (path: string, data: Partial<TData>) => Promise<void>;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FirebaseError | null>(null);

  const updateDocument = useCallback(
    async (
      path: string,
      data: Partial<TData>,
      options: SetOptions = { merge: true },
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        await setDoc(doc(db, path), data, options);
      } catch (error: any) {
        setError(error as FirebaseError);
      } finally {
        setIsLoading(false);
      }
    },
    [db],
  );

  return { isLoading, error, updateDocument };
}
