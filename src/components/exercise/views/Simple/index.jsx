import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FeedbackModal as FeedbackModalComponent } from '@components/common/modals/feedback';
import RegistrationModalComponent from '@components/common/modals/registration/registrationModal';
import CompletedTask from '@components/common/modals/completedTask';

import Terminal from '@components/common/terminal';
import Output from '@components/common/output';
import ErrorMessage from '@components/common/errorMessage';
import WarningMobile from '@components/common/warningMobile';
import UnixShell from '@components/common/unixshell';

import { NormalHint } from '@components/hint';
import Button from '@components/mui/button';

import { useExerciseCompleted } from '@components/exercise/hooks/useExerciseCompleted';
import { useMobileWarning } from '@components/exercise/hooks/useMobileWarning';
import { useTerminal } from '@components/exercise/hooks/useTerminal';
import { useSolution } from '@components/exercise/hooks/useSolution';
import { useHint } from '@components/exercise/hooks/useHint';
import { useXp } from '@components/exercise/hooks/useXp';

import { selectExercise } from '@store/exercise/selector';

import { useModal } from '@src/hooks/useModal';

import styles from './styles.module.less';
import cn from 'classnames';
import { Sidebar } from '@components/exercise/views/Simple/Sidebar';

function SimpleExercise({ onSubmit, isAuth, headers }) {
  const [sidebar, setSidebar] = useState(true);
  const toggleSidebar = () => setSidebar(!sidebar);

  const exercise = useSelector(selectExercise);
  const { exerciseId } = useParams();

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
  } = useHint(exercise);
  const { solution, showSolution } = useSolution(exercise);
  const { xp, onAnswerHintXp, onHintXp } = useXp(exercise, hintValue, answerHintValue);

  const { completeModal, closeCompleteModal, completed, incomplete, onComplete } =
    useExerciseCompleted({ headers, xp });

  const { bytePayload, isUnixShell, errorRef, errorMessage, terminal } = useTerminal(
    exercise,
    onComplete,
  );

  const { hidden: mobileWarningIsHidden, onClose: onCloseMobileWarning } = useMobileWarning();

  const { Modal: FeedbackModal, open: openFeedbackModal } = useModal(FeedbackModalComponent);

  const renderStack = () => {
    switch (exercise.stack_type) {
      case 'shell':
        return <UnixShell exerciseId={exerciseId} />;
      case 'python':
        return (
          <>
            <Terminal
              solution={solution}
              sampleCode={exercise.sample_code}
              exerciseId={exerciseId}
              correct={completed}
              isAuth={isAuth}
              xp={xp}
              onAnswer={() => {}}
              bytePayload={bytePayload}
              isGraphRequired={exercise.is_graph_required}
            />
            <Output
              isAuth={isAuth}
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
      {!mobileWarningIsHidden && <WarningMobile handleClose={onCloseMobileWarning} />}

      <div className={cn(styles.layout, { [styles.folded]: !sidebar })}>
        <div className={styles.content}>
          <Sidebar open={sidebar} toggleSidebar={toggleSidebar} xp={xp} exercise={exercise} />
          <ErrorMessage message={errorMessage} />
          <div ref={errorRef} style={{ float: 'left', clear: 'both' }} />
          {terminal.kernelId && sidebar && (
            <>
              {!hint && !withoutHint && (
                <Button
                  className={styles.hintBtn}
                  variant="outlinePurple"
                  onClick={() => {
                    showHint();
                    onHintXp();
                  }}
                >
                  Подсказка (-{hintValue} XP)
                </Button>
              )}
              <NormalHint
                hint={hint}
                answerHint={answerHint}
                setAnswerHint={setAnswerHint}
                onClick={() => {
                  openFeedbackModal();
                  setHintQuestion(false);
                }}
                exercise={exercise}
                hintQuestion={hintQuestion}
                setHintQuestion={setHintQuestion}
                onAnswer={() => {
                  showHint();
                  onAnswerHintXp();
                }}
                answerHintValue={answerHintValue}
                solution={solution}
                onSetSolution={showSolution}
              />
            </>
          )}
        </div>
        {completeModal && (
          <CompletedTask
            correctMessage={exercise?.correct_message}
            xp={xp}
            onClose={() => {
              incomplete();
              closeCompleteModal();
            }}
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

export default SimpleExercise;
