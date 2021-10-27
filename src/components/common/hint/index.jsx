import React, { useState } from 'react';
import cn from 'classnames'
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import { selectExercise } from '../../../store/exercise/selector';
import Button from '../button';

const Hint = ({
  solution,
  onOpenFeedback,
  onSetSolution,
  onSetActiveTerminalTab,
}) => {
  const [hint, setHint] = useState();
  const [feedbackOpen, setFeedbackOpen] = useState(true);
  const exercise = useSelector(selectExercise);
  return (
    <>
      <div className={cn(styles.hint, exercise.type==='quiz' ? styles.hintQuiz : '')}>
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
                  <Button variant="outlineRed" onClick={() => onOpenFeedback()}>
                    Нет
                  </Button>
                  <Button variant="outlinePurple" onClick={() => setFeedbackOpen(false)}>
                    Да
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
        {!solution && (
          <Button
            className={styles.btn}
            variant="outlinePurple"
            onClick={() => {
              if (hint) {
                onSetSolution();
                onSetActiveTerminalTab();
              } else {
                setHint(true);
              }
            }}
          >
            {!hint ? `Подсказка (-30 XP)` : `Показать ответ (-70 XP)`}
          </Button>
        )}
      </div>
    </>
  );
};

export default Hint;
