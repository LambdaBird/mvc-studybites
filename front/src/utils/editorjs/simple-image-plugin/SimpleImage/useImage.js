import { useCallback, useState } from 'react';

export const useImage = () => {
  const [src, setSrc] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleError = useCallback(() => {
    setError(true);
    setLoaded(false);
  }, []);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setError(false);
  }, []);

  return {
    src,
    setSrc,
    loaded,
    setLoaded,
    error,
    setError,
    handleError,
    handleLoad,
  };
};
