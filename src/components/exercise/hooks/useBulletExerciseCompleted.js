import { useEffect, useState } from 'react';

const initAnswer = { value: '', correct: false, error: 'Выберите ответ' };

export const useBulletExerciseCompleted = (exercise) => {
  const [point, setPoint] = useState(1);
  const [donePoints, setDonePoints] = useState(new Set());

  const [completed, setCompleted] = useState(false);
  const [completeModal, setModal] = useState(false);

  const [answer, setAnswer] = useState(initAnswer);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setCompleted(false);
  }, [point]);

  useEffect(() => {
    if (completed) {
      setDonePoints((prev) => new Set(prev.add(point)));

      if (point < exercise?.nested_exercises.length) {
        setPoint(point + 1);
        setAnswer(initAnswer);
      } else {
        setModal(true);
      }
      setCompleted(false);
    }
  }, [completed]);

  const closeCompleteModal = () => setModal(false);

  return {
    point,
    setPoint,
    donePoints,
    completeModal,
    closeCompleteModal,
    completed,
    setCompleted,
    answer,
    errorMessage,
  };
};
