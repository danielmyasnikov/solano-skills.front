import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackModal as FeedbackModalComponent } from '@components/common/modals/feedback';
import CompletedTask from '@components/common/modals/completedTask';
import { selectExercise } from '@store/exercise/selector';
import { BulletHint, NormalHint } from '@components/hint';
import Button from '@components/mui/button';
import ErrorMessage from '@components/common/errorMessage';
import Terminal from '@components/common/terminal';
import Output from '@components/common/output';
import { sendAnswer } from '@store/exercise/actions';
import { useSolution } from '@components/exercise/hooks/useSolution';
import { useHint } from '@components/exercise/hooks/useHint';
import { useXp } from '@components/exercise/hooks/useXp';
import { useTerminal } from '@components/exercise/hooks/useTerminal';
import { useModal } from '@src/hooks/useModal';
import { useIsQuiz } from '@components/exercise/hooks/useIsQuiz';
import { useBulletExerciseCompleted } from '@components/exercise/hooks/useBulletExerciseCompleted';
import { Sidebar } from '@components/exercise/templates/Steps/Sidebar';
import cn from 'classnames';
import UnixShell from '@components/common/unixshell';

function BulletPointExercise({ onSubmit, isAuth, headers }) {
  const dispatch = useDispatch();

  const [sidebar, setSidebar] = useState(true);
  const toggleSidebar = () => setSidebar(!sidebar);

  const exercise = useSelector(selectExercise);

  const [currentPoints, setPoints] = useState(0);
  const [sum, setSum] = useState(0);

  const {
    point,
    setPoint,
    donePoints,
    completed,
    completeModal,
    closeCompleteModal,
    setAnswer,
    setCompleted,
    setErrorMessage,
    answer,
    errorMessage,
  } = useBulletExerciseCompleted({ exercise, xp: currentPoints, headers });

  const nestedExercise = useMemo(() => exercise?.nested_exercises, [exercise]);
  const [activeExercise, setActiveExercise] = useState(nestedExercise[0]);

  const isQuiz = useIsQuiz(activeExercise);

  const {
    hint,
    hintValue,
    answerHint,
    setAnswerHint,
    answerHintValue,
    hintQuestion,
    setHintQuestion,
    withoutHint,
    showHint,
  } = useHint(activeExercise);
  const { solution, showSolution } = useSolution(activeExercise);
  const { xp, onAnswerHintXp, onHintXp } = useXp(activeExercise, hintValue, answerHintValue);
  const {
    terminal,
    bytePayload,
    errorMessage: terminalErrorMessage,
    errorRef,
  } = useTerminal(activeExercise, () => {
    setCompleted(true);

    setPoints(xp);
    setSum(xp + sum);
  });

  const { Modal: FeedbackModal, open: openFeedbackModal } = useModal(FeedbackModalComponent);

  const handleHelp = () => {
    onHintXp();
    showHint();
  };

  const checkAnswer = () => {
    setCompleted(answer.correct);
    if (answer.correct) {
      setErrorMessage('');
      if (isAuth) {
        dispatch(sendAnswer(activeExercise?.slug, activeExercise?.course_slug, xp, headers));
      }
    } else {
      setErrorMessage(answer.error);
    }
  };

  useEffect(() => {
    if (!!errorMessage) {
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [errorMessage]);

  useEffect(() => {
    setActiveExercise(nestedExercise[point - 1]);
  }, [nestedExercise, point]);

  const renderStack = () => {
    switch (exercise.stack_type) {
      case 'shell':
        return <UnixShell exerciseId={activeExercise?.id} />;
      case 'python':
        return (
          <>
            <Terminal
              solution={solution}
              sampleCode={activeExercise?.sample_code}
              exerciseId={activeExercise?.id}
              correct={completed}
              isAuth={isAuth}
              onAnswer={() => {}}
              xp={xp}
              bytePayload={bytePayload}
              isGraphRequired={activeExercise?.is_graph_required}
            />
            <Output
              isAuth={isAuth}
              bulletExercise={activeExercise}
              isBulletPointExercise
              terminal={terminal}
              presentation_url={exercise.presentation_url}
              variant="outputContainer"
            />
          </>
        );
      default:
        break;
    }
  };

  return (
    <>
      <div className={cn(styles.layout, { [styles.folded]: !sidebar })}>
        <div className={styles.content}>
          <Sidebar
            exercise={activeExercise}
            open={sidebar}
            toggleSidebar={toggleSidebar}
            point={point}
            xp={xp}
            hint={hint}
            withoutHint={withoutHint}
            total={nestedExercise.length}
            onSetActiveExercise={({ activeExercise }) => {
              setPoint(activeExercise);
            }}
            checkAnswer={checkAnswer}
            doneExercises={donePoints}
            nestedExercise={nestedExercise}
            isQuiz={isQuiz}
            setCompleted={setCompleted}
            setErrorMessage={setErrorMessage}
            setAnswer={setAnswer}
            answer={answer}
            handleHelp={handleHelp}
            hintValue={hintValue}
            isAuth={isAuth}
            headers={headers}
          />

          <ErrorMessage message={terminalErrorMessage || errorMessage} />
          <div ref={errorRef} style={{ float: 'left', clear: 'both' }} />
          {terminal.kernelId && sidebar && (
            <>
              {!hint && !withoutHint && (
                <Button className={styles.hintBtn} variant="outlinePurple" onClick={handleHelp}>
                  Подсказка (-{hintValue} XP)
                </Button>
              )}
              <BulletHint
                hint={hint}
                activeExercise={activeExercise}
                onClick={openFeedbackModal}
                onAnswer={onAnswerHintXp}
                answerHint={answerHint}
                setAnswerHint={setAnswerHint}
                hintQuestion={hintQuestion}
                setHintQuestion={setHintQuestion}
                solution
                onSetSolution={showSolution}
                answerHintValue={answerHintValue}
              />
            </>
          )}
        </div>
        {completeModal && (
          <CompletedTask
            correctMessage={exercise?.correct_message}
            onClose={() => {
              setCompleted(false);
              closeCompleteModal();
            }}
            xp={sum}
            onClick={() => {
              onSubmit();
              closeCompleteModal();
            }}
          />
        )}
      </div>
      <div className={styles.terminal}>{renderStack()}</div>

      <FeedbackModal />
    </>
  );
}

export default BulletPointExercise;
