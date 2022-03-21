import React, { useMemo } from 'react';
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
import RadioButton from '@components/mui/radioButton';
import { sendAnswer } from '@store/exercise/actions';
import { Exercise } from '@components/exercise/common/Exercise';
import { BulletInstruction } from '@components/exercise/common/BulletInstruction';
import { useSolution } from '@components/exercise/hooks/useSolution';
import { useHint } from '@components/exercise/hooks/useHint';
import { useXp } from '@components/exercise/hooks/useXp';
import { useTerminal } from '@components/exercise/hooks/useTerminal';
import { useModal } from '@src/hooks/useModal';
import RegistrationModalComponent from '@components/common/modals/registration/registrationModal';
import { useIsQuiz } from '@components/exercise/hooks/useIsQuiz';
import { useBulletExerciseCompleted } from '@components/exercise/hooks/useBulletExerciseCompleted';

function BulletPointExercise({ onSubmit, isAuth, headers }) {
  const dispatch = useDispatch();

  const exercise = useSelector(selectExercise);

  const {
    completed,
    activeExerciseIndex,
    doneExercises,
    completeModal,
    setActiveExerciseIndex,
    closeCompleteModal,
    setAnswer,
    setCompleted,
    setErrorMessage,
    answer,
    errorMessage,
  } = useBulletExerciseCompleted(exercise);

  const nestedExercise = useMemo(() => exercise?.nested_exercises, [exercise]);
  const activeExercise = useMemo(
    () => exercise?.nested_exercises[activeExerciseIndex],
    [exercise, activeExerciseIndex],
  );

  const isQuiz = useIsQuiz(activeExercise);
  const { hint, withoutHint, showHint } = useHint(activeExercise);
  const { solution, showSolution } = useSolution(activeExercise);
  const { xp, onAnswerXp, onAnswerHintXp, onHintXp } = useXp(activeExercise);
  const {
    bytePayload,
    errorMessage: terminalErrorMessage,
    errorRef,
  } = useTerminal(activeExercise, () => setCompleted(true));

  const { Modal: FeedbackModal, open: openFeedbackModal } = useModal(FeedbackModalComponent);
  const { Modal: RegistrationModal, open: openRegistrationModal } = useModal(
    RegistrationModalComponent,
  );

  const handleHelp = () => {
    onHintXp();
    showHint();
  };

  function terminalClickHandler() {
    if (!isAuth) {
      openRegistrationModal();
    }
  }

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise exercise={activeExercise} />
            <BulletInstruction
              onSetActiveExercise={({ activeExercise }) => {
                setActiveExerciseIndex(activeExercise);
              }}
              doneExercises={doneExercises}
              activeExercise={activeExerciseIndex}
              nestedExercise={nestedExercise}
              xp={xp}
            >
              {isQuiz ? (
                <>
                  <div className={styles.quiz}>
                    {activeExercise?.answers.map((item) => (
                      <RadioButton
                        key={item.value}
                        checked={answer.value === item.value}
                        className={styles.quizItem}
                        isHtml
                        onChange={() => {
                          setAnswer(item);
                        }}
                        value={item.value}
                      />
                    ))}
                  </div>
                  <div className={styles.btnContainer}>
                    {hint ||
                      (withoutHint && (
                        <Button className={styles.btn} variant="outlinePurple" onClick={handleHelp}>
                          Подсказка (-30 XP)
                        </Button>
                      ))}
                    <Button
                      variant="containedPurple"
                      onClick={() => {
                        setCompleted(answer.correct);
                        if (!answer.correct) {
                          setErrorMessage(answer.error);
                        } else {
                          setErrorMessage('');
                          if (isAuth) {
                            dispatch(
                              sendAnswer(
                                activeExercise.slug,
                                activeExercise.course_slug,
                                xp,
                                headers,
                              ),
                            );
                          }
                        }
                      }}
                    >
                      Ответить
                    </Button>
                  </div>
                </>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: activeExercise.instruction,
                  }}
                  className={styles.instructions}
                />
              )}
            </BulletInstruction>
          </div>
          <div ref={errorRef}>
            <ErrorMessage message={terminalErrorMessage || errorMessage} />
          </div>
          {hint ||
            (withoutHint && !isQuiz && (
              <Button className={styles.hintBtn} variant="outlinePurple" onClick={handleHelp}>
                Подсказка (-30 XP)
              </Button>
            ))}
          <BulletHint
            hint={hint}
            activeExercise={activeExerciseIndex}
            onClick={openFeedbackModal}
            onAnswer={onAnswerHintXp}
            solution
            onSetSolution={showSolution}
          />
        </div>
        {completeModal && (
          <CompletedTask
            correctMessage={exercise?.correct_message}
            onClose={() => {
              setCompleted(false);
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
        <Terminal
          solution={solution}
          sampleCode={activeExercise.sample_code}
          exerciseId={activeExercise.id}
          correct={completed}
          isAuth={isAuth}
          onAnswer={onAnswerXp}
          xp={xp}
          bytePayload={bytePayload}
          isGraphRequired={activeExercise.is_graph_required}
        />
        <Output
          isAuth={isAuth}
          bulletExercise={activeExercise}
          isBulletPointExercise
          presentation_url={exercise.presentation_url}
          variant="outputContainer"
        />
      </div>

      <FeedbackModal />
      <RegistrationModal />
    </>
  );
}

export default BulletPointExercise;
