import { useEffect, useState } from 'react';

export const useHint = (exercise) => {
  const [hint, setHint] = useState(false);
  const [withoutHint, setWithoutHint] = useState(false);

  useEffect(() => {
    setHint(false);
    setWithoutHint(!!exercise.hint);
  }, [exercise]);

  function showHint() {
    setHint(true);
  }

  return { hint, withoutHint, showHint };
};
