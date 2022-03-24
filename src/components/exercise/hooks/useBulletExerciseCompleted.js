import { useEffect, useState } from 'react';
import { sendAnswer } from '@store/exercise/actions';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const initAnswer = { value: '', correct: false, error: 'Выберите ответ' };

export const useBulletExerciseCompleted = ({ exercise, xp, headers }) => {
  const dispatch = useDispatch();
  const [point, setPoint] = useState(1);
  const [donePoints, setDonePoints] = useState(new Set());
  const { courseId } = useParams();

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
        dispatch(sendAnswer(exercise.slug, courseId, xp, headers));
      } else {
        setModal(true);
      }
      setCompleted(false);
    }
  }, [completed]);

  useEffect(() => {
    setPoint(1);
    setDonePoints(new Set());
    setCompleted(false);
    setModal(false);
    setAnswer(initAnswer);
    setErrorMessage('');
  }, [exercise.id]);

  const closeCompleteModal = () => setModal(false);

  return {
    point,
    setPoint,
    donePoints,
    completeModal,
    closeCompleteModal,
    completed,
    setErrorMessage,
    setCompleted,
    answer,
    setAnswer,
    errorMessage,
  };
};
