import { useEffect, useState } from 'react';

export const useIsQuiz = (exercise) => {
  const [isQuiz, setIsQuiz] = useState(false);

  useEffect(() => {
    setIsQuiz(exercise?.type === 'quiz');
  }, [exercise]);

  return isQuiz;
};
