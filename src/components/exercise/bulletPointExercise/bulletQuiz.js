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
import { NormalExercise } from '@components/common/exercise';
import { NormalInstruction } from '@components/instruction';
import RadioButton from '@components/mui/radioButton';
import Button from '@components/mui/button';
import ErrorMessage from '@components/common/errorMessage';
import Output from '@components/common/output';

function BulletQuiz({ exercise }) {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const [answer, setAnswer] = useState({ value: '', correct: false, error: 'Выберите ответ' });
  const [errorMessage, setErrorMessage] = useState();
  const [hint, setHint] = useState();
  const { courseId, exerciseId } = useParams();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  useEffect(() => {
    dispatch(getExercise(courseId, exerciseId));
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
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <NormalExercise />
            <NormalInstruction onSubmit={() => setCompletedTaskModalOpen(true)}>
              <div className={styles.quiz}>
                {exercise.answers.map((item) => (
                  <React.Fragment key={item.value}>
                    <RadioButton
                      checked={answer.value === item.value}
                      className={styles.quizItem}
                      onChange={(e) => {
                        setAnswer(item);
                      }}
                      value={item.value}
                    />
                  </React.Fragment>
                ))}
              </div>
              <div className={styles.btnContainer}>
                {!hint || withoutHint === true  && (
                  <Button
                    className={styles.btn}
                    variant="outlinePurple"
                    onClick={() => setHint(true)}
                  >
                    Подсказка (-30 XP)
                  </Button>
                )}
                <Button
                  variant="containedPurple"
                  onClick={() => {
                    checkAnswer();
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
        <Output
          presentation_url={exercise.presentation_url}
          className={styles.quizOutputContainer}
        />
      </div>
    </>
  );
}

export default BulletQuiz;
