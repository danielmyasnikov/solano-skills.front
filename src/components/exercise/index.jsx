import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getExercise, GET_EXERCISE_REQUESTED } from '../../store/exercise/actions';
import { clearTerminal } from '../../store/terminal/actions';
import { useParams } from 'react-router-dom';
import { selectExercise } from '../../store/exercise/selector';
import QuizTemplate from './quizTemplate';
import styles from './styles.module.less';
import NormalExerciseTemplate from './normalExerciseTemplate';
import { VideoExercise } from './videoExercise';

function ExercisePage() {
  const { courseId, exerciseId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  useEffect(() => {
    dispatch({ type: GET_EXERCISE_REQUESTED, payload: { courseId, exerciseId } });
  }, []);

  const onSubmit = () => {
    history.push(`/courses/python-for-beginners/exercises/${exercise.next_exercise_id}`);
    dispatch(getExercise(courseId, exercise.next_exercise_id));
    dispatch(clearTerminal());
  };
  const renderExercise = () => {
    switch (exercise.type) {
      case 'quiz':
        return <QuizTemplate onSubmit={onSubmit} />;
      case 'normal_exercise':
        return <NormalExerciseTemplate onSubmit={onSubmit} />;
      case 'video':
        return <VideoExercise onSubmit={onSubmit} />;
      default:
        break;
    }
  };
  return <div className={styles.exerciseContainer}>{renderExercise()}</div>;
}

export default ExercisePage;
