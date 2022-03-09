import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import FeedbackModal from '@components/common/modals/feedback/index.js';
import CompletedTask from '@components/common/modals/completedTask';
import { getExercise } from '@store/exercise/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectExercise } from '@store/exercise/selector';
import { QuizHint } from '@components/hint';
import { Exercise } from '@components/common/exercise';
import { NormalInstruction } from '@components/instruction';
import Button from '@components/mui/button';
import ErrorMessage from '@components/common/errorMessage';
import Output from '@components/common/output';
import RegistrationModal from '@components/common/modals/registration/registrationModal';
import { sendAnswer } from '@store/exercise/actions';
import * as AuthStore from '@store/auth';

function QuizTemplate({ onSubmit, isAuth }) {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const [withoutHint, setWithoutHint] = useState(false);
  const [answer, setAnswer] = useState({ value: '', correct: false, error: 'Выберите ответ' });
  const [errorMessage, setErrorMessage] = useState();
  const [hint, setHint] = useState();

  const { courseId, exerciseId } = useParams();

  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const handleAnswer = (item) => {
    setAnswer(item);
  };

  useEffect(() => {
    setWithoutHint(exercise.hint ? true : false);
    setHint(false);
    setAnswer({ value: '', correct: false, error: 'Выберите ответ' });
    setCompletedTaskModalOpen(false);
  }, [exercise]);

  useEffect(() => {
    dispatch(getExercise(courseId, exerciseId, headers));
    if (!exercise) {
      return null;
    }
  }, []);

  const checkAnswer = () => {
    // if (isAuth) {
    if (answer.correct === true) {
      setErrorMessage('');
      setCompletedTaskModalOpen(true);
    } else {
      setErrorMessage(answer.error);
    }
    if (exercise.type === 'quiz') {
      dispatch(sendAnswer(exercise.slug, courseId, exercise.xp, headers));
    }
    // } else {
    //   setRegistrationModalOpen(true);
    // }
  };

  return (
    <>
      {feedbackModalOpen && <FeedbackModal onClose={() => setFeedbackModalOpen(false)} />}
      {registrationModalOpen && <RegistrationModal />}
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise exercise={exercise} />
            <NormalInstruction
              answer={answer}
              xp={exercise.xp}
              handleAnswer={handleAnswer}
              exercise={exercise}
              onSubmit={() => setCompletedTaskModalOpen(true)}
            >
              <div className={styles.btnContainer}>
                {!hint === false ||
                  (withoutHint === true && (
                    <Button
                      className={styles.btn}
                      variant="outlinePurple"
                      onClick={() => setHint(true)}
                    >
                      Подсказка (-30 XP)
                    </Button>
                  ))}
                <Button variant="containedPurple" onClick={checkAnswer}>
                  Ответить
                </Button>
              </div>
            </NormalInstruction>
          </div>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <QuizHint
            hint={hint}
            onClick={() => {
              setFeedbackModalOpen(true);
            }}
          />
        </div>
        {completedTaskModalOpen && (
          <CompletedTask
            correctMessage={exercise?.correct_message}
            onClose={() => setCompletedTaskModalOpen(false)}
            onClick={() => {
              onSubmit();
              setCompletedTaskModalOpen(false);
            }}
          />
        )}
      </div>
      <div className={styles.terminal}>
        <Output presentation_url={exercise.presentation_url} variant="quizOutputContainer" />
      </div>
    </>
  );
}

export default QuizTemplate;
