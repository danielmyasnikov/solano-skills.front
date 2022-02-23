import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getExercise } from '@store/exercise/actions';
import { clearTerminal } from '@store/terminal/actions';
import { useParams } from 'react-router-dom';
import { selectExercise } from '@store/exercise/selector';
import * as AuthStore from '@store/auth';
import QuizTemplate from './quizTemplate';
import styles from './styles.module.less';
import NormalExerciseTemplate from './normalExerciseTemplate';
import { VideoExercise } from './videoExercise';
import BulletPointExercise from './bulletPointExercise';

const ExercisePage = () => {
  const { courseId, exerciseId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  const [isAuth, setIsAuth] = useState(false);
  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  useEffect(() => {
    dispatch(clearTerminal());
    dispatch(getExercise(courseId, exerciseId));
  }, [location.pathname]);
  useEffect(() => {
    if (headers.uid && headers.client && headers['access-token']) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [headers]);
  const onSubmit = () => {
    history.push(`/courses/${courseId}/exercises/${exercise.next_exercise_id}`);
    dispatch(getExercise(courseId, exercise.next_exercise_id));
  };
  const renderExercise = () => {
    switch (exercise.type) {
      case 'quiz':
        return (
          <div className={styles.exerciseContainer}>
            <QuizTemplate isAuth={isAuth} onSubmit={onSubmit} />
          </div>
        );
      case 'normal_exercise':
        return (
          <div className={styles.exerciseContainer}>
            <NormalExerciseTemplate isAuth={isAuth} onSubmit={onSubmit} />{' '}
          </div>
        );
      case 'bullet_point_exercise':
        return (
          <div className={styles.exerciseContainer}>
            <BulletPointExercise isAuth={isAuth} onSubmit={onSubmit} />{' '}
          </div>
        );
      case 'video':
        return <VideoExercise isAuth={isAuth} onSubmit={onSubmit} />;
      default:
        return undefined;
    }
  };
  return <>{renderExercise()}</>;
};

export default ExercisePage;
