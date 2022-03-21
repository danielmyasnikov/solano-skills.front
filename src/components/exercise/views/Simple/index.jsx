import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FeedbackModal as FeedbackModalComponent } from '@components/common/modals/feedback';
import RegistrationModalComponent from '@components/common/modals/registration/registrationModal';
import CompletedTask from '@components/common/modals/completedTask';

import Terminal from '@components/common/terminal';
import Output from '@components/common/output';
import ErrorMessage from '@components/common/errorMessage';
import WarningMobile from '@components/common/warningMobile';
import Draggable from '@components/common/draggable';
import UnixShell from '@components/common/unixshell';

import { NormalHint } from '@components/hint';
import Button from '@components/mui/button';

import { Instruction } from '@components/exercise/common/Instruction';
import { Exercise } from '@components/exercise/common/Exercise';

import { useExerciseCompleted } from '@components/exercise/hooks/useExerciseCompleted';
import { useDraggableContent } from '@components/exercise/hooks/useDraggableContent';
import { useMobileWarning } from '@components/exercise/hooks/useMobileWarning';
import { useTerminal } from '@components/exercise/hooks/useTerminal';
import { useSolution } from '@components/exercise/hooks/useSolution';
import { useHint } from '@components/exercise/hooks/useHint';
import { useXp } from '@components/exercise/hooks/useXp';

import { selectExercise } from '@store/exercise/selector';

import { useModal } from '@src/hooks/useModal';

import styles from './styles.module.less';

function NormalExerciseTemplate({ onSubmit, isAuth }) {
  const { completeModal, closeCompleteModal, completed, incomplete, onComplete } =
    useExerciseCompleted();

  const exercise = useSelector(selectExercise);
  const { exerciseId } = useParams();

  const { height, contentRef, layoutRef } = useDraggableContent();

  const { bytePayload, isUnixShell, errorRef, errorMessage } = useTerminal(exercise, onComplete);
  const { hint, withoutHint, showHint } = useHint(exercise);
  const { solution, showSolution } = useSolution(exercise);
  const { xp, onAnswerXp, onAnswerHintXp, onHintXp } = useXp(exercise);

  const { hidden: mobileWarningIsHidden, onClose: onCloseMobileWarning } = useMobileWarning();

  const { Modal: FeedbackModal, open: openFeedbackModal } = useModal(FeedbackModalComponent);
  const { Modal: RegistrationModal, open: openRegistrationModal } = useModal(
    RegistrationModalComponent,
  );

  function terminalClickHandler() {
    if (!isAuth) {
      openRegistrationModal();
    }
  }

  return (
    <>
      {!mobileWarningIsHidden && <WarningMobile handleClose={onCloseMobileWarning} />}

      <div ref={layoutRef} className={styles.layout}>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise exercise={exercise} />
            <Instruction xp={exercise.xp}>
              <div
                dangerouslySetInnerHTML={{ __html: exercise.instruction }}
                className={styles.instructions}
              />
            </Instruction>
            <Draggable parentContainer={contentRef} resizeContainer={layoutRef} height={height} />
          </div>
          <div ref={errorRef}>
            <ErrorMessage message={errorMessage} />
          </div>
          {hint ||
            (withoutHint && (
              <Button
                className={styles.hintBtn}
                variant="outlinePurple"
                onClick={() => {
                  showHint();
                  onHintXp();
                }}
              >
                Подсказка (-30 XP)
              </Button>
            ))}
          <NormalHint
            hint={hint}
            onClick={openFeedbackModal}
            onAnswer={() => {
              showHint();
              onAnswerHintXp();
            }}
            solution
            onSetSolution={showSolution}
          />
        </div>
        {completeModal && (
          <CompletedTask
            correctMessage={exercise?.correct_message}
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
      <div onClick={terminalClickHandler} className={styles.terminal}>
        {isUnixShell ? (
          <UnixShell />
        ) : (
          <>
            <Terminal
              solution={solution}
              sampleCode={exercise.sample_code}
              exerciseId={exerciseId}
              correct={completed}
              isAuth={isAuth}
              xp={xp}
              onAnswer={onAnswerXp}
              bytePayload={bytePayload}
              isGraphRequired={exercise.is_graph_required}
            />
            <Output
              isAuth={isAuth}
              presentation_url={exercise.presentation_url}
              variant="outputContainer"
            />
          </>
        )}
      </div>

      <FeedbackModal />
      <RegistrationModal />
    </>
  );
}

export default NormalExerciseTemplate;
