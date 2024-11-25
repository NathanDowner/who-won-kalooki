import { FirebaseError } from 'firebase/app';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

type UseUpdateDocumentOptions<TResponse> = {
  onSuccess?: (data: TResponse) => void;
  successNotificationText?: string;
  showErrorToast?: boolean;
  initialData?: TResponse;
};

export function useUpdateDocument<TData, TResponse>(
  updateFn: (data: TData) => Promise<TResponse>,
  options: UseUpdateDocumentOptions<TResponse> = { showErrorToast: true },
): {
  error: FirebaseError | null;
  isLoading: boolean;
  data: TResponse | null;
  execute: (data: TData) => Promise<void>;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FirebaseError | null>(null);
  const [responseData, setResponseData] = useState<TResponse | null>(
    options.initialData ?? null,
  );

  const execute = useCallback(
    async (data: TData) => {
      setIsLoading(true);
      setError(null);
      try {
        const { onSuccess, successNotificationText } = options;
        const resp = await updateFn(data);

        if (onSuccess) {
          onSuccess(resp);
        } else {
          setResponseData(resp);
        }

        if (successNotificationText) {
          toast.success(successNotificationText);
        }
      } catch (err: unknown) {
        console.log(err);
        setError(err as FirebaseError);
        const { showErrorToast } = options;
        if (showErrorToast) {
          toast.error(error!.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [updateFn, options],
  );

  return { isLoading, error, execute, data: responseData };
}
