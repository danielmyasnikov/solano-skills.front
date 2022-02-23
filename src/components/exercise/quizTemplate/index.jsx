import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FeedbackModal from '@components/common/modals/feedback/index.js';
import CompletedTask from '@components/common/modals/completedTask';
import { getExercise } from '@store/exercise/actions';
import { useParams } from 'react-router-dom';
import { selectTerminal } from '@store/terminal/selector';
import { selectExercise } from '@store/exercise/selector';
import { QuizHint } from '@components/hint';
import { Exercise } from '@components/common/exercise';
import { NormalInstruction } from '@components/instruction';
import Button from '@components/mui/button';
import ErrorMessage from '@components/common/errorMessage';
import Output from '@components/common/output';
import RegistrationModal from '@components/common/modals/registration/registrationModal';
import styles from './styles.module.less';

// eslint-disable-next-line no-unused-vars
const QuizTemplate = ({ onSubmit, isAuth }) => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const [withoutHint, setWithoutHint] = useState(false);
  const [answer, setAnswer] = useState({ value: '', correct: false, error: 'Выберите ответ' });
  const [errorMessage, setErrorMessage] = useState();
  const [hint, setHint] = useState();
  const { courseId, exerciseId } = useParams();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  // eslint-disable-next-line no-unused-vars
  const terminal = useSelector(selectTerminal);

  const handleAnswer = (item) => {
    setAnswer(item);
  };

  useEffect(() => {
    setWithoutHint(!!exercise.hint);
    setHint(false);
    setAnswer({ value: '', correct: false, error: 'Выберите ответ' });
    setCompletedTaskModalOpen(false);
  }, [exercise]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    dispatch(getExercise(courseId, exerciseId));
    if (!exercise) {
      return undefined;
    }
  }, []);

  const checkAnswer = () => {
    if (answer.correct === true) {
      setErrorMessage('');
      setCompletedTaskModalOpen(true);
    } else {
      setErrorMessage(answer.error);
    }
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
                <Button
                  variant="containedPurple"
                  onClick={() => {
                    // if (isAuth) {
                    checkAnswer();
                    // } else {
                    //   setRegistrationModalOpen(true);
                    // }
                  }}
                >
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
        <Output presentationUrl={exercise.presentation_url} variant="quizOutputContainer" />
      </div>
    </>
  );
};

export default QuizTemplate;
