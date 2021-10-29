import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import FeedbackModal from '../../common/modals/feedback.js/index.js';
import CompletedTask from '../../common/modals/completedTask';
import { getExercise } from '../../../store/exercise/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectExercise } from '../../../store/exercise/selector';
import cn from 'classnames';
import Hint from '../../common/hint';
import Exercise from '../../common/exercise';
import Instruction from '../../common/instruction';
import RadioButton from '../../mui/radioButton';
import Button from '../../mui/button';
import ErrorMessage from '../../common/errorMessage';
import Output from '../../common/output';

function QuizTemplate({ onSubmit }) {
  const [activeTab, setActiveTab] = useState('output');
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
    console.log(answer);
    if (answer.correct === true) {
      setErrorMessage('');
      setCompletedTaskModalOpen(true);
    } else {
      setErrorMessage(answer.error);
    }
  };
  return (
    <>
      {feedbackModalOpen && <FeedbackModal onClick={() => setFeedbackModalOpen(false)} />}
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise />
            <Instruction onSubmit={() => setCompletedTaskModalOpen(true)}>
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
                {!hint && (
                  <Button
                    className={styles.btn}
                    variant="outlinePurple"
                    onClick={() => setHint(true)}
                  >
                    Подсказка (-30 XP)
                  </Button>
                )}
                <Button
                  className={styles.btn}
                  variant="fillPurple"
                  onClick={() => {
                    checkAnswer();
                  }}
                >
                  Ответить
                </Button>
              </div>
            </Instruction>
          </div>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <Hint
            hint={hint}
            onClick={() => {
              setFeedbackModalOpen(true);
            }}
          />
        </div>
        {completedTaskModalOpen && (
          <CompletedTask
            onClick={() => {
              onSubmit();
              setCompletedTaskModalOpen(false);
            }}
          />
        )}
      </div>
      <div className={styles.terminal}>
        <Output className={styles.quizOutputContainer} />
      </div>
    </>
  );
}

export default QuizTemplate;
