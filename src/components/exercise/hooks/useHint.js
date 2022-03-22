import { useEffect, useMemo, useState } from 'react';

export const useHint = (exercise) => {
  const [hint, setHint] = useState(false);
  const [withoutHint, setWithoutHint] = useState(false);

  useEffect(() => {
    setHint(false);
    setWithoutHint(!!exercise?.hint);
  }, [exercise]);

  function showHint() {
    setHint(true);
  }

  const hintValue = useMemo(() => Math.ceil(exercise?.xp * 0.3), [exercise]);

  const answerHintValue = exercise?.xp - hintValue;

  return { hint, hintValue, answerHintValue, withoutHint, showHint };
};
