import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackModal as FeedbackModalComponent } from '@components/common/modals/feedback';
import CompletedTask from '@components/common/modals/completedTask';
import { selectExercise } from '@store/exercise/selector';
import { BulletHint } from '@components/hint';
import Button from '@components/mui/button';
import ErrorMessage from '@components/common/errorMessage';
import Terminal from '@components/common/terminal';
import Output from '@components/common/output';
import { sendAnswer } from '@store/exercise/actions';
import { useSolution } from '@components/exercise/hooks/useSolution';
import { useHint } from '@components/exercise/hooks/useHint';
import { useTerminal } from '@components/exercise/hooks/useTerminal';
import { useModal } from '@src/hooks/useModal';
import { useIsQuiz } from '@components/exercise/hooks/useIsQuiz';
import { Sidebar } from '@components/exercise/templates/Steps/Sidebar';
import cn from 'classnames';
import UnixShell from '@components/common/unixshell';
import { getProfile } from '@store/profile/actions';

const initAnswer = { value: '', correct: false, error: 'Выберите ответ' };

function BulletPointExercise({ onSubmit, isAuth, headers }) {
  const dispatch = useDispatch();

  const exercise = useSelector(selectExercise);

  const [sidebar, setSidebar] = useState(true);
  const toggleSidebar = () => setSidebar(!sidebar);

  const [totalXp, setTotalXp] = useState(0);

  const [step, setStep] = useState(1);
  const [doneSteps, setDoneSteps] = useState(new Set());

  const [answer, setAnswer] = useState(initAnswer);

  const [stepComplete, setStepComplete] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const [xp, setXp] = useState(activeExercise?.xp);

  const onAnswerHintXp = () => setXp(xp - answerHintValue);
  const onHintXp = () => setXp(xp - hintValue);

  const {
    terminal,
    bytePayload,
    errorMessage: terminalErrorMessage,
    errorRef,
  } = useTerminal(activeExercise, () => {
    setStepComplete(true);

    setTotalXp(xp + totalXp);
  });

  const { Modal: FeedbackModal, open: openFeedbackModal } = useModal(FeedbackModalComponent);

  const handleHelp = () => {
    onHintXp();
    showHint();
  };

  const checkAnswer = () => {
    setStepComplete(answer.correct);
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
    setActiveExercise(nestedExercise[step - 1]);
    setErrorMessage('');
    setStepComplete(false);
    setXp(nestedExercise[step - 1]?.xp);
  }, [step]);

  useEffect(() => {
    if (stepComplete) {
      setDoneSteps((prev) => new Set(prev.add(step)));

      if (step < nestedExercise.length) {
        setStep(step + 1);
        setAnswer(initAnswer);
        dispatch(sendAnswer(activeExercise?.slug, activeExercise?.course_slug, xp, headers));
        dispatch(getProfile({ headers }));
      } else {
        setCompleteModal(true);
      }
      setStepComplete(false);
    }
  }, [stepComplete]);

  useEffect(() => {
    setStep(1);
    setDoneSteps(new Set());
    setStepComplete(false);
    setCompleteModal(false);
    setAnswer(initAnswer);
    setErrorMessage('');
  }, [exercise]);

  const renderStack = () => {
    switch (exercise.stack_type) {
      case 'shell':
        return <UnixShell exerciseId={activeExercise?.id} />;
      case 'python':
        return (
          <>
            <Terminal
              exercise={activeExercise}
              solution={solution}
              correct={stepComplete}
              isAuth={isAuth}
              xp={xp}
              bytePayload={bytePayload}
            />
            <Output variant="outputContainer" exercise={activeExercise} />
          </>
        );
      default:
        return (
          <>
            <Terminal
              exercise={activeExercise}
              solution={solution}
              correct={stepComplete}
              isAuth={isAuth}
              xp={xp}
              bytePayload={bytePayload}
            />
            <Output variant="outputContainer" exercise={activeExercise} />
          </>
        );
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
            point={step}
            xp={xp}
            hint={hint}
            hintValue={hintValue}
            withoutHint={withoutHint}
            checkAnswer={checkAnswer}
            doneExercises={doneSteps}
            nestedExercise={nestedExercise}
            isQuiz={isQuiz}
            setAnswer={setAnswer}
            answer={answer}
            handleHelp={handleHelp}
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
              onSubmit();
              setStepComplete(false);
              setCompleteModal(false);
            }}
            onClick={() => {
              onSubmit();
              setStepComplete(false);
              setCompleteModal(false);
            }}
            xp={totalXp}
          />
        )}
      </div>
      <div className={styles.terminal}>{renderStack()}</div>

      <FeedbackModal />
    </>
  );
}

export default BulletPointExercise;
