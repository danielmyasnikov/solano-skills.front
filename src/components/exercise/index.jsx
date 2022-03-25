import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import * as AuthStore from '@store/auth';
import { makeCertificate } from '@store/api/exercise';
import { getExercise } from '@store/exercise/actions';
import { selectExercise } from '@store/exercise/selector';
import { clearTerminal } from '@store/terminal/actions';

import SimpleExercise from './views/Simple';
import StepsExercise from './templates/Steps';
import QuizExercise from './templates/Quiz';
import VideoExercise from './views/Video';

import styles from './styles.module.less';

function ExercisePage() {
  const { courseId, exerciseId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  const [isAuth, setIsAuth] = useState(false);
  const [authCounter, setAuthCounter] = useState(0);
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const onSubmit = async () => {
    if (exercise.is_certificate_ready) {
      const cid = await makeCertificate(exercise.course_slug, headers);
      history.push(`/certificates/${cid}`);
      return;
    }
    history.push(`/courses/${courseId}/exercises/${exercise.next_exercise_id}`);
    dispatch(getExercise(courseId, exercise.next_exercise_id, headers));
  };

  const renderContent = () => {
    switch (exercise.type) {
      case 'quiz':
        return <QuizExercise isAuth={isAuth} onSubmit={onSubmit} />;
      case 'normal_exercise':
        return <SimpleExercise isAuth={isAuth} onSubmit={onSubmit} />;
      case 'bullet_point_exercise':
        return <StepsExercise isAuth={isAuth} onSubmit={onSubmit} />;
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
    return <VideoExercise isAuth={isAuth} onSubmit={onSubmit} />;
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
