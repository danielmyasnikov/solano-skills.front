import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getExercise } from '@store/exercise/actions';
import { clearTerminal } from '@store/terminal/actions';
import { useParams } from 'react-router-dom';
import { selectExercise } from '@store/exercise/selector';
import QuizTemplate from './quizTemplate';
import styles from './styles.module.less';
import NormalExerciseTemplate from './normalExerciseTemplate';
import { VideoExercise } from './videoExercise';

function ExercisePage() {
  const { courseId, exerciseId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  useEffect(() => {
    dispatch(clearTerminal())
    dispatch(getExercise(courseId, exerciseId));
  }, [location.pathname]);
  const onSubmit = () => {
    history.push(`/courses/${courseId}/exercises/${exercise.next_exercise_id}`);
    dispatch(getExercise(courseId, exercise.next_exercise_id));
    dispatch(clearTerminal());
  };
  const renderExercise = () => {
    switch (exercise.type) {
      case 'quiz':
        return (
          <div className={styles.exerciseContainer}>
            <QuizTemplate onSubmit={onSubmit} />
          </div>
        );
      case 'normal_exercise':
        return (
          <div className={styles.exerciseContainer}>
            <NormalExerciseTemplate onSubmit={onSubmit} />{' '}
          </div>
        );
      case 'video':
        return <VideoExercise onSubmit={onSubmit} />;
      default:
        break;
    }
  };
  return <>{renderExercise()}</>;
}

export default ExercisePage;
