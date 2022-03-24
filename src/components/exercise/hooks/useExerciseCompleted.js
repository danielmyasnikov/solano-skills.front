import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectExercise } from '@store/exercise/selector';
import { sendAnswer } from '@store/exercise/actions';
import { useParams } from 'react-router-dom';

export const useExerciseCompleted = ({ xp, headers }) => {
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  const { courseId } = useParams();

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

  const onComplete = () => {
    setCompleted(true);
    dispatch(sendAnswer(exercise.slug, courseId, xp, headers));
  };

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
