import { useState, useEffect, useCallback, useRef } from 'react';

export const useFetch = (url, initialOptions = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const optionsRef = useRef(initialOptions);

  const fetchData = useCallback(async (overrideOptions) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, overrideOptions || optionsRef.current);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (url) {
      fetchData().catch(() => {});
    }
  }, [fetchData, url]);

  return { data, loading, error, refetch: fetchData };
};
