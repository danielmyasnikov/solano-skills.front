import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import FeedbackModal from '@components/common/modals/feedback/index.js';
import CompletedTask from '@components/common/modals/completedTask';
import Terminal from '@components/common/terminal';
import { useParams } from 'react-router-dom';
import { selectExercise } from '@store/exercise/selector';
import { selectTerminal } from '@store/terminal/selector';
import Hint from '@components/common/hint';
import Exercise from '@components/common/exercise';
import Instruction from '@components/common/instruction';
import Button from '@components/mui/button';
import Output from '@components/common/output';
import ErrorMessage from '@components/common/errorMessage';

function NormalExerciseTemplate({ onSubmit }) {
  const [solution, setSolution] = useState();
  const [hint, setHint] = useState();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const [correct, setCorrect] = useState(false);
  const { exerciseId } = useParams();
  const exercise = useSelector(selectExercise);
  const terminal = useSelector(selectTerminal);
  useEffect(() => {
    if (terminal.message.status === 'success') {
      setCorrect(true);
    }
  }, [terminal]);
  useEffect(() => {
    setSolution('');
    setCorrect('');
    setHint(false)
  }, [exercise]);
  useEffect(() => {
    if (correct) {
      setCompletedTaskModalOpen(true);
    }
  }, [correct]);
  return (
    <>
      {feedbackModalOpen && <FeedbackModal onClick={() => setFeedbackModalOpen(false)} />}
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise />
            <Instruction onSubmit={() => setCompletedTaskModalOpen(true)}>
              <div
                dangerouslySetInnerHTML={{ __html: exercise.instruction }}
                className={styles.instructions}
              />
            </Instruction>
          </div>
          {terminal.message.status === 'error' && <ErrorMessage message={terminal.message.error} />}
          {!hint && (
            <Button
              className={styles.hintBtn}
              variant="outlinePurple"
              onClick={() => setHint(true)}
            >
              Подсказка (-30 XP)
            </Button>
          )}
          <Hint
            hint={hint}
            onClick={() => {
              setFeedbackModalOpen(true);
            }}
            solution={true}
            onSetSolution={() => setSolution(exercise.solution)}
          />
        </div>
        {completedTaskModalOpen && (
          <CompletedTask
            onClose={() => {
              setCorrect(false);
              setCompletedTaskModalOpen(false);
            }}
            onClick={() => {
              onSubmit();
              setCompletedTaskModalOpen(false);
            }}
          />
        )}
      </div>
      <div className={styles.terminal}>
        <Terminal
          solution={solution}
          sampleCode={exercise.sample_code}
          exerciseId={exerciseId}
          correct={correct}
        />
        <Output presentation_url={exercise.presentation_url} className={styles.outputContainer}>
          {terminal.outputs.map((item, i) => (
            <React.Fragment key={i}>
              <span className={cn(item.status === 'error' ? styles.error : styles.success)}>
                {item.status === 'error' ? item.error : item.output}
              </span>
            </React.Fragment>
          ))}
        </Output>
      </div>
    </>
  );
}

export default NormalExerciseTemplate;
