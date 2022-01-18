import React, { useEffect, useRef, useState } from 'react';
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

function NormalExerciseTemplate({ onSubmit, isAuth }) {
  const [solution, setSolution] = useState();
  const [hint, setHint] = useState();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const [withoutHint, setWithoutHint] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [initialPos, setInitialPos] = useState();
  const [initialSize, setInitialSize] = useState();
  const { exerciseId } = useParams();
  const errorRef = useRef();
  const contentRef = useRef();
  const resizableRef = useRef();
  const layoutRef = useRef();
  const exercise = useSelector(selectExercise);
  const terminal = useSelector(selectTerminal);

  const initial = (e) => {
    setInitialPos(e.clientX);
    setInitialSize(contentRef.current.offsetWidth);
  };

  const resize = (e) => {
    layoutRef.current.style.width = `${parseInt(initialSize) + parseInt(e.clientX - initialPos)}px`;
  };

  useEffect(() => {
    if (terminal.message.status === 'success') {
      setCorrect(true);
    }
  }, [terminal]);

  useEffect(() => {
    setSolution('');
    setCorrect('');
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
      errorRef.current?.scrollIntoView();
    }
  }, [terminal]);

  return (
    <>
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
            <div
              ref={resizableRef}
              className={styles.draggable}
              draggable={true}
              onDragStart={initial}
              onDrag={resize}
            />
          </div>
          <div ref={errorRef}>
            <ErrorMessage message={terminal.message.error} />
          </div>
          {!hint === false ||
            (withoutHint === true && (
              <Button
                className={styles.hintBtn}
                variant="outlinePurple"
                onClick={() => setHint(true)}
              >
                Подсказка (-30 XP)
              </Button>
            ))}
          <NormalHint
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
        <Terminal
          solution={solution}
          sampleCode={exercise.sample_code}
          exerciseId={exerciseId}
          correct={correct}
          isAuth={isAuth}
          bytePayload={terminal.bytePayload}
          isGraphRequired={exercise.is_graph_required}
        />
        <Output presentation_url={exercise.presentation_url} variant="outputContainer" />
      </div>
    </>
  );
}

export default NormalExerciseTemplate;
