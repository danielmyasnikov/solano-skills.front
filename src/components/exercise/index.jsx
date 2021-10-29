import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Container from '../common/container';
import { useSelector } from 'react-redux';
import { getExercise } from '../../store/exercise/actions';
import { clearTerminal } from '../../store/terminal/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectExercise } from '../../store/exercise/selector';
import QuizTemplate from './quizTemplate';
import styles from './styles.module.less';
import NormalExerciseTemplate from './normalExerciseTemplate';
function ExercisePage() {
  const { courseId, exerciseId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  useEffect(() => {
    dispatch(getExercise(courseId, exerciseId));
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
        return <NormalExerciseTemplate />;
      default:
        break;
    }
  };
  return (
    <Container>
      <div className={styles.exerciseContainer}>{renderExercise()}</div>
    </Container>
  );
}

export default ExercisePage;
