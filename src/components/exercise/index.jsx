import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getExercise } from '@store/exercise/actions';
import { clearTerminal } from '@store/terminal/actions';
import { useParams } from 'react-router-dom';
import { selectExercise } from '@store/exercise/selector';
import QuizTemplate from './views/quizTemplate';
import styles from './styles.module.less';
import NormalExerciseTemplate from './views/normalExerciseTemplate';
import { VideoExercise } from './views/videoExercise';
import BulletPointExercise from './views/bulletPointExercise';
import * as AuthStore from '@store/auth';
import cn from 'classnames';

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

  const renderContent = () => {
    switch (exercise.type) {
      case 'quiz':
        return <QuizTemplate isAuth={isAuth} onSubmit={onSubmit} />;
      case 'normal_exercise':
        return <NormalExerciseTemplate isAuth={isAuth} onSubmit={onSubmit} />;
      case 'bullet_point_exercise':
        return <BulletPointExercise isAuth={isAuth} onSubmit={onSubmit} />;
      default:
        break;
    }
  };

  useEffect(() => {
    if (headers.uid && headers.client && headers['access-token']) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setAuthCounter(authCounter + 1);
  }, [location.pathname, headers]);

  useEffect(() => {
    dispatch(clearTerminal());
    if (authCounter >= 1) {
      if (headers) {
        dispatch(getExercise(courseId, exerciseId, headers));
      } else {
        dispatch(getExercise(courseId, exerciseId));
      }
    }
  }, [authCounter]);

  if (exercise.type === 'video') {
    return <VideoExercise isAuth={isAuth} onSubmit={onSubmit} headers={headers} />;
  }

  return (
    <div
      className={cn(styles.exerciseContainer, {
        [styles.bulletPointContainer]: exercise.type === 'bullet_point_exercise',
      })}
    >
      {renderContent()}
    </div>
  );
}

export default ExercisePage;
