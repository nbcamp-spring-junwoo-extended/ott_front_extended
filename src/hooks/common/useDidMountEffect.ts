import { useEffect, useRef } from 'react';

export const useDidMountEffect = (effect: () => void, deps: unknown[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) effect();
    else didMount.current = true;
  }, deps);
};
