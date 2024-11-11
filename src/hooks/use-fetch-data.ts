import {useCallback, useState} from 'react';

type FetchState<T, U> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  reset: () => void;
  fetchFn: (arg: U) => Promise<void>;
};
const useFetchData = <T, U>(
  fetchFn: (args: U) => Promise<T>,
): FetchState<T, U> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (args: U) => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchFn(args);
        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, setLoading, setData, setError],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, [setData, setError, setLoading]);

  return {
    data,
    loading,
    error,
    reset,
    fetchFn: fetchData,
  };
};

export default useFetchData;
