import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectExercise } from '@store/exercise/selector';

export const useExerciseCompleted = () => {
  const exercise = useSelector(selectExercise);

  const [completeModal, setModal] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(false);
  }, [exercise]);

  useEffect(() => {
    if (completed) {
      setModal(true);
    }
  }, [completed]);

  const onComplete = () => setCompleted(true);
  const incomplete = () => setCompleted(false);

  const closeCompleteModal = () => setModal(false);

  return {
    completeModal,
    closeCompleteModal,
    completed,
    incomplete,
    onComplete,
  };
};
