import { useEffect, useState } from 'react';

const initAnswer = { value: '', correct: false, error: 'Выберите ответ' };

export const useBulletExerciseCompleted = (exercise) => {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);

  const [doneExercises, setDoneExercises] = useState([]);

  const [completed, setCompleted] = useState(false);
  const [completeModal, setModal] = useState(false);

  const [answer, setAnswer] = useState(initAnswer);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setCompleted(false);
  }, [activeExerciseIndex]);

  useEffect(() => {
    if (completed) {
      setDoneExercises([...doneExercises, { activeExercise: activeExerciseIndex }]);

      if (activeExerciseIndex < exercise?.nested_exercises.length - 1) {
        setActiveExerciseIndex(activeExerciseIndex + 1);
        setAnswer(initAnswer);
      } else {
        setModal(true);
      }
    }
  }, [completed]);

  const closeCompleteModal = () => setModal(false);

  return {
    activeExerciseIndex,
    doneExercises,
    completeModal,
    closeCompleteModal,
    completed,
    setActiveExerciseIndex,
    setCompleted,
    answer,
    errorMessage,
  };
};
