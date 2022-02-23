import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import { selectExercise } from '@store/exercise/selector';
import Button from '@components/mui/button';

export const QuizHint = ({ hint, onClick, solution, onSetSolution }) => {
  const [feedbackOpen, setFeedbackOpen] = useState(true);
  const exercise = useSelector(selectExercise);
  const [showAnswer, setShowAnswer] = useState(true);
  useEffect(() => {
    setShowAnswer(true);
  }, [exercise]);
  return (
    <>
      <div className={cn(styles.hint, styles.hintQuiz)}>
        {hint && (
          <>
            <div className={styles.hintInfo}>
              <h6>Подсказка</h6>
              <p dangerouslySetInnerHTML={{ __html: exercise.hint }}></p>
            </div>
            {feedbackOpen && (
              <div className={styles.feedback}>
                <p>Вам помогла эта подсказка?</p>
                <div className={styles.feedbackAnswer}>
                  <Button variant="outlineRed" onClick={onClick}>
                    Нет
                  </Button>
                  <Button variant="outlinePurple" onClick={() => setFeedbackOpen(false)}>
                    Да
                  </Button>
                </div>
              </div>
            )}
            {solution && showAnswer && (
              <Button
                className={styles.btn}
                variant="outlinePurple"
                onClick={() => {
                  onSetSolution();
                  setShowAnswer(false);
                }}
              >
                Показать ответ (-70 XP)
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export const NormalHint = ({ hint, onClick, solution, onSetSolution }) => {
  const [feedbackOpen, setFeedbackOpen] = useState(true);
  const exercise = useSelector(selectExercise);
  const [showAnswer, setShowAnswer] = useState(true);
  useEffect(() => {
    setShowAnswer(true);
  }, [exercise]);
  return (
    <>
      <div className={styles.hint}>
        {hint && (
          <>
            <div className={styles.hintInfo}>
              <h6>Подсказка</h6>
              <p dangerouslySetInnerHTML={{ __html: exercise.hint }}></p>
            </div>
            {feedbackOpen && (
              <div className={styles.feedback}>
                <p>Вам помогла эта подсказка?</p>
                <div className={styles.feedbackAnswer}>
                  <Button variant="outlineRed" onClick={onClick}>
                    Нет
                  </Button>
                  <Button variant="outlinePurple" onClick={() => setFeedbackOpen(false)}>
                    Да
                  </Button>
                </div>
              </div>
            )}
            {solution && showAnswer && (
              <Button
                className={styles.btn}
                variant="outlinePurple"
                onClick={() => {
                  onSetSolution();
                  setShowAnswer(false);
                }}
              >
                Показать ответ (-70 XP)
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export const BulletHint = ({ hint, activeExercise, onClick, solution, onSetSolution }) => {
  const [feedbackOpen, setFeedbackOpen] = useState(true);
  const exercise = useSelector(selectExercise);
  const [showAnswer, setShowAnswer] = useState(true);
  useEffect(() => {
    setShowAnswer(true);
  }, [exercise]);
  useEffect(() => {
    setShowAnswer(true);
  }, [activeExercise]);
  return (
    <>
      <div className={styles.hint}>
        {hint && (
          <>
            <div className={styles.hintInfo}>
              <h6>Подсказка</h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: exercise?.nested_exercises[activeExercise].hint,
                }}
              ></p>
            </div>
            {feedbackOpen && (
              <div className={styles.feedback}>
                <p>Вам помогла эта подсказка?</p>
                <div className={styles.feedbackAnswer}>
                  <Button variant="outlineRed" onClick={onClick}>
                    Нет
                  </Button>
                  <Button variant="outlinePurple" onClick={() => setFeedbackOpen(false)}>
                    Да
                  </Button>
                </div>
              </div>
            )}
            {solution && showAnswer && (
              <Button
                className={styles.btn}
                variant="outlinePurple"
                onClick={() => {
                  onSetSolution();
                  setShowAnswer(false);
                }}
              >
                Показать ответ (-70 XP)
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};
