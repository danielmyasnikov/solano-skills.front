import React, { useEffect, useState } from 'react';
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
import BulletPointExercise from './bulletPointExercise';
import * as AuthStore from '@store/auth';

function ExercisePage() {
  const { courseId, exerciseId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  const [isAuth, setIsAuth] = useState(false);
  const [authCounter, setAuthCounter] = useState(0);
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const onSubmit = () => {
    history.push(`/courses/${courseId}/exercises/${exercise.next_exercise_id}`);
    dispatch(getExercise(courseId, exercise.next_exercise_id, headers));
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
        return <VideoExercise isAuth={isAuth} onSubmit={onSubmit} headers={headers} />;
      default:
        break;
    }
  };

  useEffect(() => {});

  useEffect(() => {
    if (headers.uid && headers.client && headers['access-token']) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setAuthCounter(authCounter + 1);
  }, [headers]);

  useEffect(() => {
    dispatch(clearTerminal());
    if (authCounter > 1) {
      if (isAuth) {
        dispatch(getExercise(courseId, exerciseId, headers));
      } else {
        dispatch(getExercise(courseId, exerciseId));
      }
    }
  }, [authCounter, courseId, dispatch, exerciseId, headers, isAuth, location.pathname]);

  return <>{renderExercise()}</>;
}

export default ExercisePage;
