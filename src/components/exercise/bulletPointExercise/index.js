import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.less';
import { useDispatch, useSelector } from 'react-redux';
import { FeedbackModal } from '@components/common/modals/feedback';
import CompletedTask from '@components/common/modals/completedTask';
import { selectExercise } from '@store/exercise/selector';
import { selectTerminal } from '@store/terminal/selector';
import { BulletHint } from '@components/hint';
import { BulletInstruction } from '@components/instruction';
import Button from '@components/mui/button';
import ErrorMessage from '@components/common/errorMessage';
import Terminal from '@components/common/terminal';
import Output from '@components/common/output';
import RadioButton from '@components/mui/radioButton';
import { Exercise } from '@components/common/exercise';
import { sendAnswer } from '@store/exercise/actions';

function BulletPointExercise({ onSubmit, isAuth, headers }) {
  const [solution, setSolution] = useState();
  const [bytePayload, setBytePayload] = useState([]);
  const [doneExercises, setDoneExercises] = useState([]);
  const [answer, setAnswer] = useState({ value: '', correct: false, error: 'Выберите ответ' });
  const [hint, setHint] = useState();
  const [withoutHint, setWithoutHint] = useState(false);
  const [message, setMessage] = useState();
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [nestedExercise, setNestedExercise] = useState([]);
  const [activeExercise, setActiveExercise] = useState(0);
  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [isQuiz, setIsQuiz] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const errorRef = useRef();
  const exercise = useSelector(selectExercise);
  const [xp, setXp] = useState(exercise.nested_exercises[activeExercise].xp);
  const terminal = useSelector(selectTerminal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (terminal.message.status === 'success') {
      setCorrect(true);
    }
    if (terminal.message.error) {
      setMessage(terminal.message.error);
    } else {
      setMessage();
    }
    if (terminal.bytePayload) {
      setBytePayload([...bytePayload, { payload: terminal.bytePayload }]);
    }
  }, [terminal]);

  useEffect(() => {
    setNestedExercise(exercise?.nested_exercises);
    setSolution('');
    setCorrect('');
    setBytePayload([]);
    setHint(false);
    setIsQuiz(exercise.nested_exercises[activeExercise].type === 'quiz' ? true : false);
    setWithoutHint(exercise.nested_exercises[activeExercise].hint ? true : false);
  }, [exercise]);

  useEffect(() => {
    setNestedExercise(exercise?.nested_exercises);
    setSolution('');
    setErrorMessage('');
    setCorrect('');
    setHint(false);
    setIsQuiz(exercise.nested_exercises[activeExercise].type === 'quiz' ? true : false);
    setWithoutHint(exercise.nested_exercises[activeExercise].hint ? true : false);
  }, [activeExercise]);

  useEffect(() => {
    if (correct) {
      if (exercise?.nested_exercises.length - 1 > activeExercise) {
        setDoneExercises([...doneExercises, { activeExercise }]);
        setActiveExercise(activeExercise + 1);
      } else {
        setDoneExercises([...doneExercises, { activeExercise }]);
        setCompletedTaskModalOpen(true);
      }
    }
  }, [correct]);

  useEffect(() => {
    setXp(exercise?.nested_exercises[activeExercise].xp);
  }, [activeExercise]);

  useEffect(() => {
    if (terminal.message.error) {
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminal]);

  const handleHelp = () => {
    setXp(xp - 30);
    setHint(true);
  };

  const checkAnswer = () => {
    if (answer.correct === true) {
      setErrorMessage('');
      setCompletedTaskModalOpen(true);
      if (isAuth) {
        dispatch(
          sendAnswer(
            exercise?.nested_exercises[activeExercise].slug,
            exercise?.nested_exercises[activeExercise].course_slug,
            xp,
            headers,
          ),
        );
      }
    } else {
      setErrorMessage(answer.error);
    }
  };

  return (
    <>
      {feedbackModalOpen && <FeedbackModal onClose={() => setFeedbackModalOpen(false)} />}
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <Exercise exercise={exercise?.nested_exercises[activeExercise]} />
            <BulletInstruction
              doneExercises={doneExercises}
              activeExercise={activeExercise}
              nestedExercise={nestedExercise}
              xp={exercise?.nested_exercises[activeExercise].xp}
              onSubmit={() => setCompletedTaskModalOpen(true)}
              onSetActiveExercise={({ activeExercise }) => {
                setActiveExercise(activeExercise);
                setMessage('');
              }}
            >
              {!isQuiz && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: exercise?.nested_exercises[activeExercise].instruction,
                  }}
                  className={styles.instructions}
                />
              )}
              {isQuiz && (
                <>
                  <div className={styles.quiz}>
                    {exercise.nested_exercises[activeExercise].answers &&
                      exercise.nested_exercises[activeExercise]?.answers.map((item) => (
                        <React.Fragment key={item.value}>
                          <RadioButton
                            checked={answer.value === item.value}
                            className={styles.quizItem}
                            isHtml={true}
                            onChange={(e) => {
                              setAnswer(item);
                            }}
                            value={item.value}
                          />
                        </React.Fragment>
                      ))}
                  </div>
                  <div className={styles.btnContainer}>
                    {!hint === false ||
                      (withoutHint === true && (
                        <Button className={styles.btn} variant="outlinePurple" onClick={handleHelp}>
                          Подсказка (-30 XP)
                        </Button>
                      ))}
                    <Button
                      variant="containedPurple"
                      onClick={() => {
                        checkAnswer();
                      }}
                    >
                      Ответить
                    </Button>
                  </div>
                </>
              )}
            </BulletInstruction>
          </div>
          <div ref={errorRef}>
            <ErrorMessage message={message || errorMessage} />
          </div>
          {!hint === false ||
            (withoutHint === true && !isQuiz && (
              <Button className={styles.hintBtn} variant="outlinePurple" onClick={handleHelp}>
                Подсказка (-30 XP)
              </Button>
            ))}
          <BulletHint
            hint={hint}
            activeExercise={activeExercise}
            onClick={() => {
              setFeedbackModalOpen(true);
            }}
            onAnswer={() => setXp(xp - 70)}
            solution={true}
            onSetSolution={() => setSolution(exercise?.nested_exercises[activeExercise].solution)}
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
          sampleCode={exercise?.nested_exercises[activeExercise].sample_code}
          exerciseId={exercise?.nested_exercises[activeExercise].id}
          correct={correct}
          isAuth={isAuth}
          onAnswer={() => setXp(exercise?.nested_exercises[activeExercise].xp)}
          xp={xp}
          bytePayload={bytePayload}
          isGraphRequired={exercise?.nested_exercises[activeExercise].is_graph_required}
        />
        <Output
          bulletExercise={exercise?.nested_exercises[activeExercise]}
          isBulletPointExercise={true}
          presentation_url={exercise.presentation_url}
          variant="outputContainer"
        />
      </div>
    </>
  );
}

export default BulletPointExercise;
