import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import { selectExercise } from '@store/exercise/selector';
import Button from '@components/mui/button';

export const QuizHint = ({
  hint,
  onClick,
  solution,
  onSetSolution,
  hintQuestion,
  setHintQuestion,
  answerHint,
  setAnswerHint,
  answerHintValue,
}) => {
  const exercise = useSelector(selectExercise);

  const answerHandler = () => {
    onSetSolution();
    setAnswerHint(false);
  };

  return (
    <>
      <div className={cn(styles.hint, styles.hintQuiz)}>
        {hint && (
          <>
            <div className={styles.hintInfo}>
              <h6>Подсказка</h6>
              <p dangerouslySetInnerHTML={{ __html: exercise.hint }} />
            </div>
            {hintQuestion && (
              <div className={styles.feedback}>
                <p>Вам помогла эта подсказка?</p>
                <div className={styles.feedbackAnswer}>
                  <Button variant="outlineRed" onClick={onClick}>
                    Нет
                  </Button>
                  <Button variant="outlinePurple" onClick={() => setHintQuestion(false)}>
                    Да
                  </Button>
                </div>
              </div>
            )}
            {solution && answerHint && (
              <Button className={styles.btn} variant="outlinePurple" onClick={answerHandler}>
                Показать ответ (-{answerHintValue} XP)
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export const NormalHint = ({
  hint,
  onClick,
  solution,
  onSetSolution,
  onAnswer,
  answerHintValue,
  answerHint,
  setAnswerHint,
  exercise,
  hintQuestion,
  setHintQuestion,
}) => {
  const answerHandler = () => {
    onSetSolution();
    setAnswerHint(false);
    onAnswer();
  };

  return (
    <>
      <div className={styles.hint}>
        {hint && (
          <>
            <div className={styles.hintInfo}>
              <h6>Подсказка</h6>
              <p dangerouslySetInnerHTML={{ __html: exercise.hint }} />
            </div>
            {hintQuestion && (
              <div className={styles.feedback}>
                <p>Вам помогла эта подсказка?</p>
                <div className={styles.feedbackAnswer}>
                  <Button variant="outlineRed" onClick={onClick}>
                    Нет
                  </Button>
                  <Button variant="outlinePurple" onClick={() => setHintQuestion(false)}>
                    Да
                  </Button>
                </div>
              </div>
            )}
            {solution && answerHint && (
              <Button className={styles.btn} variant="outlinePurple" onClick={answerHandler}>
                Показать ответ (-{answerHintValue} XP)
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export const BulletHint = ({
  hint,
  activeExercise,
  onClick,
  solution,
  onSetSolution,
  onAnswer,
  answerHintValue,
  answerHint,
  setAnswerHint,
  hintQuestion,
  setHintQuestion,
}) => {
  const answerHandler = () => {
    onSetSolution();
    setAnswerHint(false);
    onAnswer();
  };
  return (
    <>
      <div className={styles.hint}>
        {hint && (
          <>
            <div className={styles.hintInfo}>
              <h6>Подсказка</h6>
              <p
                dangerouslySetInnerHTML={{
                  __html: activeExercise?.hint,
                }}
              />
            </div>
            {hintQuestion && (
              <div className={styles.feedback}>
                <p>Вам помогла эта подсказка?</p>
                <div className={styles.feedbackAnswer}>
                  <Button variant="outlineRed" onClick={onClick}>
                    Нет
                  </Button>
                  <Button variant="outlinePurple" onClick={() => setHintQuestion(false)}>
                    Да
                  </Button>
                </div>
              </div>
            )}
            {solution && answerHint && (
              <Button className={styles.btn} variant="outlinePurple" onClick={answerHandler}>
                Показать ответ (-{answerHintValue} XP)
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
};
