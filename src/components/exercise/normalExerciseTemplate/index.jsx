import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import FeedbackModal from '../../common/modals/feedback.js/index.js';
import CompletedTask from '../../common/modals/completedTask';
import Terminal from '../../common/terminal';
import { getExercise } from '../../../store/exercise/actions';
import { clearTerminal } from '../../../store/terminal/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectExercise } from '../../../store/exercise/selector';
import { selectTerminal } from '../../../store/terminal/selector';
import Hint from '../../common/hint';
import Exercise from '../../common/exercise';
import Instruction from '../../common/instruction';
import Button from '../../mui/button';
import Output from '../../common/output';

function NormalExerciseTemplate() {
  const [solution, setSolution] = useState();
  const [hint, setHint] = useState();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const { courseId, exerciseId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  const terminal = useSelector(selectTerminal);
  useEffect(() => {
    dispatch(getExercise(courseId, exerciseId));
  }, []);
  const onSubmit = () => {
    history.push(`/courses/python-for-beginners/exercises/${exercise.next_exercise_id}`);
    setCompletedTaskModalOpen(false);
    dispatch(getExercise(courseId, exercise.next_exercise_id));
    dispatch(clearTerminal());
  };
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
          {!hint && (
            <Button
              className={ styles.hintBtn}
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
        {completedTaskModalOpen && <CompletedTask onClose={() => setCompletedTaskModalOpen(false)} onClick={onSubmit} />}
      </div>
      <div className={styles.terminal}>
        <Terminal
          solution={solution}
          setModalOpen={() => setCompletedTaskModalOpen(true)}
          sampleCode={exercise.sample_code}
        />
        <Output className={styles.outputContainer}>
          {terminal.map((item, i) => (
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
