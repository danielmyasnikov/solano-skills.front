import { useEffect, useMemo, useState } from 'react';

export const useHint = (exercise) => {
  const [hint, setHint] = useState(false);
  const [answerHint, setAnswerHint] = useState(true);
  const [hintQuestion, setHintQuestion] = useState(true);
  const [withoutHint, setWithoutHint] = useState(false);

  useEffect(() => {
    setHint(false);
    setWithoutHint(!exercise?.hint);
    setAnswerHint(true);
    setHintQuestion(true);
  }, [exercise]);

  function showHint() {
    setHint(true);
  }

  const hintValue = useMemo(() => Math.ceil(exercise?.xp * 0.3), [exercise]);

  const answerHintValue = exercise?.xp - hintValue;

  return {
    hint,
    hintValue,
    answerHintValue,
    withoutHint,
    showHint,
    answerHint,
    setAnswerHint,
    hintQuestion,
    setHintQuestion,
  };
};
