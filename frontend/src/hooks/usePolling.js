import { useState, useEffect, useCallback, useRef } from 'react';

export const usePolling = (fetchFn, interval = 5000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep a stable ref to the latest fetchFn so changing it never
  // restarts the polling loop or causes a loading flash.
  const fetchFnRef = useRef(fetchFn);
  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  const fetchData = useCallback(async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    try {
      const result = await fetchFnRef.current();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
    } finally {
      if (!isBackground) setLoading(false);
    }
  }, []); // stable — never recreated

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    const poll = async () => {
      if (!isMounted) return;
      await fetchData(true); // background = no loading flash
      timeoutId = setTimeout(poll, interval);
    };

    fetchData(); // initial fetch (shows loading spinner once)
    timeoutId = setTimeout(poll, interval);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [fetchData, interval]); // both are now stable

  return { data, loading, error, refetch: () => fetchData(false) };
};
