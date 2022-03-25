import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectExercise } from '@store/exercise/selector';

export const useXp = (exercise, hintXp = 30, answerXp = 70) => {
  const [xp, setXp] = useState(exercise?.xp);

  useEffect(() => {
    setXp(exercise?.xp);
  }, [exercise]);

  const onAnswerHintXp = () => setXp(xp - answerXp);
  const onHintXp = () => setXp(xp - hintXp);

  return { xp, onAnswerHintXp, onHintXp };
};
