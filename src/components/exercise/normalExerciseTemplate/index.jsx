import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import FeedbackModal from '@components/common/modals/feedback/index.js';
import CompletedTask from '@components/common/modals/completedTask';
import Terminal from '@components/common/terminal';
import { useParams } from 'react-router-dom';
import { selectExercise } from '@store/exercise/selector';
import { selectTerminal } from '@store/terminal/selector';
import { NormalHint } from '@components/hint';
import { Exercise } from '@components/common/exercise';
import { NormalInstruction } from '@components/instruction';
import Button from '@components/mui/button';
import Output from '@components/common/output';
import ErrorMessage from '@components/common/errorMessage';
import WarningMobile from '@components/common/warningMobile';
import Draggable from '@components/common/draggable';
import UnixShell from '../../common/unixshell';

function NormalExerciseTemplate({ onSubmit, isAuth }) {
  const [bytePayload, setBytePayload] = useState([]);
  const [xp, setXp] = useState(0);
  const [height, setHeight] = useState(0);
  const [isWarningHidden, setIsWarningHidden] = useState(true);
  const [solution, setSolution] = useState();
  const { search } = useLocation();
  const [hint, setHint] = useState();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const [withoutHint, setWithoutHint] = useState(false);
  const [correct, setCorrect] = useState(false);
  const { exerciseId } = useParams();
  const errorRef = useRef();
  const contentRef = useRef();
  const layoutRef = useRef();
  const exercise = useSelector(selectExercise);
  const terminal = useSelector(selectTerminal);
  const [isUnixShell, setIsUnixShell] = useState(false);

  useEffect(() => {
    if (search === '?is_unix_shell') {
      setIsUnixShell(true);
    }
  }, [search]);

  useEffect(() => {
    if (terminal.message.status === 'success') {
      setCorrect(true);
    }
  }, [terminal]);

  useEffect(() => {
    setSolution('');
    setCorrect('');
    setBytePayload([]);
    setHint(false);
    setWithoutHint(exercise.hint ? true : false);
  }, [exercise]);

  useEffect(() => {
    if (correct) {
      //отправка опыта
      setCompletedTaskModalOpen(true);
    } else {
      setCompletedTaskModalOpen(false);
    }
  }, [correct]);

  useEffect(() => {
    if (terminal.message.error) {
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (terminal.bytePayload) {
      setBytePayload([...bytePayload, { payload: terminal.bytePayload }]);
    }
  }, [terminal]);

  useEffect(() => {
    setXp(exercise.xp);
    setHeight(contentRef?.current?.offsetHeight);
    if (!localStorage.getItem('warning')) {
      setIsWarningHidden(false);
    }
  }, []);

  const closeWarning = () => {
    localStorage.setItem('warning', 'hidden');
    setIsWarningHidden(true);
  };

  const helpHandler = (val) => {
    setHint(true);
    setXp(xp - val);
  };

  return (
    <>
      {!isWarningHidden && <WarningMobile handleClose={closeWarning} />}
      {feedbackModalOpen && <FeedbackModal onClose={() => setFeedbackModalOpen(false)} />}
      <div ref={layoutRef} className={styles.layout}>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise exercise={exercise} />
            <NormalInstruction xp={exercise.xp} onSubmit={() => setCompletedTaskModalOpen(true)}>
              <div
                dangerouslySetInnerHTML={{ __html: exercise.instruction }}
                className={styles.instructions}
              />
            </NormalInstruction>
            <Draggable parentContainer={contentRef} resizeContainer={layoutRef} height={height} />
          </div>
          <div ref={errorRef}>
            <ErrorMessage message={terminal.message.error} />
          </div>
          {!hint === false ||
            (withoutHint === true && (
              <Button
                className={styles.hintBtn}
                variant="outlinePurple"
                onClick={() => helpHandler(30)}
              >
                Подсказка (-30 XP)
              </Button>
            ))}
          <NormalHint
            hint={hint}
            onClick={() => {
              setFeedbackModalOpen(true);
            }}
            onAnswer={() => helpHandler(70)}
            solution={true}
            onSetSolution={() => setSolution(exercise.solution)}
          />
        </div>
        {completedTaskModalOpen && (
          <CompletedTask
            correctMessage={exercise?.correct_message}
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
        {!isUnixShell ? (
          <>
            <Terminal
              solution={solution}
              sampleCode={exercise.sample_code}
              exerciseId={exerciseId}
              correct={correct}
              isAuth={isAuth}
              bytePayload={bytePayload}
              isGraphRequired={exercise.is_graph_required}
            />
            <Output presentation_url={exercise.presentation_url} variant="outputContainer" />
          </>
        ) : (
          <UnixShell />
        )}
      </div>
    </>
  );
}

export default NormalExerciseTemplate;
