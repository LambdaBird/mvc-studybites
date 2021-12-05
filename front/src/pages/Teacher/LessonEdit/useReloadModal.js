import { useCallback, useEffect, useState } from 'react';

export const useReloadModal = ({ isNavigationAllowed }) => {
  const [isAllowed, setIsAllowed] = useState(isNavigationAllowed);

  useEffect(() => {
    setIsAllowed(isNavigationAllowed);
  }, [isNavigationAllowed]);

  const handlerBeforeUnload = useCallback(
    (event) => {
      if (!isAllowed) {
        event.preventDefault();
        // eslint-disable-next-line no-param-reassign
        event.returnValue = '';
      }
    },
    [isAllowed],
  );

  useEffect(() => {
    window.addEventListener('beforeunload', handlerBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handlerBeforeUnload);
    };
  }, [isAllowed, handlerBeforeUnload]);
};
