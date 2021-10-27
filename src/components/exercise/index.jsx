import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Container from '../common/container';
import styles from './styles.module.less';
import Terminal from '../common/terminal';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import FeedbackModal from '../common/modals/feedback.js/index.js';
import CompletedTask from '../common/modals/completedTask';
import { getExercise } from '../../store/exercise/actions';
import { clearTerminal } from '../../store/terminal/actions';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectExercise } from '../../store/exercise/selector';
import { selectTerminal } from '../../store/terminal/selector';
import Hint from '../common/hint';
import Exercise from '../common/exercise';
import Instruction from '../common/instruction';

function ExercisePage() {
  const [solution, setSolution] = useState();
  const [activeTerminalTab, setActiveTerminalTab] = useState('script');
  const [activeTab, setActiveTab] = useState('output');
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { courseId, exerciseId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const exercise = useSelector(selectExercise);
  const terminal = useSelector(selectTerminal);
  useEffect(() => {
    dispatch(getExercise(courseId, exerciseId));
  }, []);
  const onSubmit = () => {
    history.push('/courses/python-for-beginners/exercises/2');
    setModalOpen(false);
    dispatch(getExercise(courseId, exercise.next_exercise_id));
    dispatch(clearTerminal())
  };
  return (
    <>
      <Container>
        {feedbackModalOpen && <FeedbackModal onClick={() => setFeedbackModalOpen(false)} />}
        <div className={styles.exerciseContainer}>
          <div className={styles.layout}>
            <div className={styles.content}>
              <div className={styles.sidebar}>
                <Exercise />
                <Instruction onSubmit={() => setModalOpen(true)} />
              </div>
              <Hint
                solution={solution}
                onOpenFeedback={() => setFeedbackModalOpen(true)}
                onSetSolution={() => setSolution(exercise.solution)}
                onSetActiveTerminalTab={() => setActiveTerminalTab('solution')}
              />
            </div>
            {modalOpen && <CompletedTask onClick={onSubmit} />}
          </div>
          <div className={styles.terminal}>
            {exercise.type === 'normal_exercise' && (
              <>
                <div className={styles.terminalHeader}>
                  <div
                    onClick={() => setActiveTerminalTab('script')}
                    className={cn(
                      activeTerminalTab === 'script' ? styles.tabActive : '',
                      styles.tab,
                    )}
                  >
                    script.py
                  </div>
                  {solution && (
                    <div
                      onClick={() => setActiveTerminalTab('solution')}
                      className={cn(
                        activeTerminalTab === 'solution' ? styles.tabActive : '',
                        styles.tab,
                      )}
                    >
                      solution.py
                    </div>
                  )}
                </div>
                <Terminal
                  setModalOpen={() => setModalOpen(true)}
                  sampleCode={activeTerminalTab === 'solution' ? solution : exercise.sample_code}
                  readonly={activeTerminalTab === 'solution' ? true : false}
                />
              </>
            )}
            <div className={cn(styles.terminalHeader, styles.outputHeader)}>
              <div
                onClick={() => setActiveTab('output')}
                className={cn(activeTab === 'output' ? styles.tabActive : '', styles.tab)}
              >
                Вывод
              </div>
              <div
                onClick={() => setActiveTab('slides')}
                className={cn(activeTab === 'slides' ? styles.tabActive : '', styles.tab)}
              >
                Слайды
              </div>
            </div>
            <div
              className={
                exercise.type === 'quiz' ? styles.quizOutputContainer : styles.outputContainer
              }
            >
              {terminal.map((item, i) => (
                <React.Fragment key={i}>
                  {item.status === 'error' && <span className={styles.error}>{item.error}</span>}
                  {item.status === 'success' && (
                    <span className={styles.output}>{item.output}</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ExercisePage;
