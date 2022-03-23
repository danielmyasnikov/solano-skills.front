import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectExercise } from '@store/exercise/selector';

export const useSolution = (exercise) => {
  const [solution, setSolution] = useState('');

  useEffect(() => {
    setSolution('');
  }, [exercise]);

  function showSolution() {
    setSolution(exercise.solution);
  }

  return { solution, showSolution };
};
