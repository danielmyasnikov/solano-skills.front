import React, { useEffect, useState } from 'react';
import Container from '../common/container';
import styles from './styles.module.less';
import tempInfo from '../../tempJSON.json';
import Terminal from '../terminal';
import Exercise from '../exercise';
import Instructions from '../instruction';
import Button from '../common/button';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import FeedbackModal from '../common/modals/feedback.js';

function CourseExercise() {
  const [hint, setHint] = useState();
  const [sampleCode, setSampleCode] = useState();
  const [solution, setSolution] = useState();
  const [activeTerminalTab, setActiveTerminalTab] = useState('script');
  const [activeTab, setActiveTab] = useState('output');
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(true);
  const output = useSelector((state) => state.terminal.data.output);
  const error = useSelector((state) => state.terminal.data.error);
  useEffect(() => {
    setSampleCode(tempInfo.sample_code);
  }, []);
  return (
    <Container>
      {feedbackModalOpen && <FeedbackModal onClick={() => setFeedbackModalOpen(false)} />}
      <div className={styles.exerciseContainer}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise {...tempInfo} />
            <Instructions />
          </div>
          <div className={styles.hint}>
            {hint && (
              <>
                <div className={styles.hintInfo}>
                  <h6>Подсказка</h6>
                  <p dangerouslySetInnerHTML={{ __html: hint }}></p>
                </div>
                {feedbackOpen && (
                  <div className={styles.feedback}>
                    <p>Вам помогла эта подсказка?</p>
                    <div className={styles.feedbackAnswer}>
                      <Button variant="outlineRed" onClick={() => setFeedbackModalOpen(true)}>
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
                    setSolution(tempInfo.solution);
                    setActiveTerminalTab('solution');
                  } else {
                    setHint(tempInfo.hint);
                  }
                }}
              >
                {!hint ? 'Подсказка (-30 XP)' : 'Показать ответ (-70 XP)'}
              </Button>
            )}
          </div>
        </div>
        <div className={styles.terminal}>
          <div className={styles.terminalHeader}>
            <div
              onClick={() => setActiveTerminalTab('script')}
              className={cn(activeTerminalTab === 'script' ? styles.tabActive : '', styles.tab)}
            >
              script.py
            </div>
            {solution && (
              <div
                onClick={() => setActiveTerminalTab('solution')}
                className={cn(activeTerminalTab === 'solution' ? styles.tabActive : '', styles.tab)}
              >
                solution.py
              </div>
            )}
          </div>
          <Terminal
            sampleCode={activeTerminalTab === 'solution' ? solution : sampleCode}
            readonly={activeTerminalTab === 'solution' ? true : false}
          />
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
          <div className={styles.outputContainer}>
            <span className={styles.output}>{output}</span>
            <span className={styles.error}>{error}</span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CourseExercise;
