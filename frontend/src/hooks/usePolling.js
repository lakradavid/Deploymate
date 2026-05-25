import { useState, useEffect, useCallback } from 'react';

export const usePolling = (fetchFn, interval = 5000, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    try {
      const result = await fetchFn();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      if (!isBackground) setLoading(false);
    }
  }, [fetchFn, ...dependencies]);

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const poll = async () => {
      if (!isMounted) return;
      await fetchData(true);
      timeoutId = setTimeout(poll, interval);
    };

    fetchData(); // Initial fetch
    timeoutId = setTimeout(poll, interval);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [fetchData, interval]);

  return { data, loading, error, refetch: fetchData };
};
