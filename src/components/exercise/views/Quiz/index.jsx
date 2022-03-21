import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getExercise } from '@store/exercise/actions';

import { selectExercise } from '@store/exercise/selector';
import { QuizHint } from '@components/hint';
import { Exercise } from '@components/exercise/common/Exercise';
import { Instruction } from '@components/exercise/common/Instruction';
import Button from '@components/mui/button';
import ErrorMessage from '@components/common/errorMessage';
import Output from '@components/common/output';
import { sendAnswer } from '@store/exercise/actions';
import * as AuthStore from '@store/auth';
import { useModal } from '@src/hooks/useModal';

import { FeedbackModal as FeedbackModalComponent } from '@components/common/modals/feedback';
import RegistrationModalComponent from '@components/common/modals/registration/registrationModal';
import CompletedTask from '@components/common/modals/completedTask';

import styles from './styles.module.less';
import { useHint } from '@components/exercise/hooks/useHint';

function QuizTemplate({ onSubmit, isAuth }) {
  const dispatch = useDispatch();

  const exercise = useSelector(selectExercise);
  const { courseId, exerciseId } = useParams();
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const [answer, setAnswer] = useState({ value: '', correct: false, error: 'Выберите ответ' });
  const [errorMessage, setErrorMessage] = useState();

  const { hint, withoutHint, showHint } = useHint(exercise);

  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const { Modal: FeedbackModal, open: openFeedbackModal } = useModal(FeedbackModalComponent);
  const { Modal: RegistrationModal, open: openRegistrationModal } = useModal(
    RegistrationModalComponent,
  );

  const handleAnswer = (item) => {
    setAnswer(item);
  };

  useEffect(() => {
    setAnswer({ value: '', correct: false, error: 'Выберите ответ' });
  }, [exercise]);

  useEffect(() => {
    dispatch(getExercise(courseId, exerciseId, headers));
  }, []);

  const checkAnswer = () => {
    if (!isAuth) {
      openRegistrationModal();
      return;
    }

    if (answer.correct) {
      setErrorMessage('');
      setCompletedTaskModalOpen(true);
    } else {
      setErrorMessage(answer.error);
    }

    if (exercise.type === 'quiz' && isAuth) {
      dispatch(sendAnswer(exercise.slug, courseId, exercise.xp, headers));
    }
  };

  const terminalClickHandler = () => {
    if (!isAuth) {
      openRegistrationModal();
    }
  };

  return (
    <>
      <FeedbackModal />
      <RegistrationModal />
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise exercise={exercise} />
            <Instruction
              answer={answer}
              xp={exercise.xp}
              handleAnswer={handleAnswer}
              exercise={exercise}
              onSubmit={() => setCompletedTaskModalOpen(true)}
            >
              <div className={styles.btnContainer}>
                {hint ||
                  (withoutHint && (
                    <Button className={styles.btn} variant="outlinePurple" onClick={showHint}>
                      Подсказка (-30 XP)
                    </Button>
                  ))}
                <Button variant="containedPurple" onClick={checkAnswer}>
                  Ответить
                </Button>
              </div>
            </Instruction>
          </div>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <QuizHint hint={hint} onClick={openFeedbackModal} />
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
      <div onClick={terminalClickHandler} className={styles.terminal}>
        <Output
          isAuth={isAuth}
          presentation_url={exercise.presentation_url}
          variant="quizOutputContainer"
        />
      </div>
    </>
  );
}

export default QuizTemplate;
