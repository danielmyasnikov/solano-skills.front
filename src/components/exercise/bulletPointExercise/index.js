import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.less';
import { useSelector } from 'react-redux';
import FeedbackModal from '@components/common/modals/feedback/index.js';
import CompletedTask from '@components/common/modals/completedTask';
import { selectExercise } from '@store/exercise/selector';
import { selectTerminal } from '@store/terminal/selector';
import { BulletHint } from '@components/hint';
import { BulletExercise } from '@components/common/exercise';
import { BulletInstruction } from '@components/instruction';
import Button from '@components/mui/button';
import ErrorMessage from '@components/common/errorMessage';
import BulletTerminal from './bulletTerminal';
import RadioButton from '@components/mui/radioButton';

function BulletPointExercise({ onSubmit }) {
  const [solution, setSolution] = useState();
  const [doneExercises, setDoneExercises] = useState([]);
  const [answer, setAnswer] = useState({ value: '', correct: false, error: 'Выберите ответ' });
  const [hint, setHint] = useState();
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
  const terminal = useSelector(selectTerminal);
  useEffect(() => {
    if (terminal.message.status === 'success') {
      setCorrect(true);
    }
    if (terminal.message.error) {
      setMessage(terminal.message.error);
    } else {
      setMessage();
    }
  }, [terminal]);
  useEffect(() => {
    window.scrollTo({ top: 0 });
    setNestedExercise(exercise?.nested_exercises);
    setSolution('');
    setCorrect('');
    setHint(false);
    setIsQuiz(exercise.nested_exercises[activeExercise].type === 'quiz' ? true : false);
  }, [exercise]);
  useEffect(() => {
    setNestedExercise(exercise?.nested_exercises);
    setSolution('');
    setCorrect('');
    setHint(false);
    setIsQuiz(exercise.nested_exercises[activeExercise].type === 'quiz' ? true : false);
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
    if (terminal.message.error) {
      errorRef.current?.scrollIntoView();
    }
  }, [terminal]);
  const checkAnswer = () => {
    if (answer.correct === true) {
      setErrorMessage('');
      setCompletedTaskModalOpen(true);
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
            <BulletExercise activeExercise={activeExercise} />
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
                    {exercise.nested_exercises[activeExercise]?.answers.map((item) => (
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
                    {!hint && (
                      <Button
                        className={styles.btn}
                        variant="outlinePurple"
                        onClick={() => setHint(true)}
                      >
                        Подсказка (-30 XP)
                      </Button>
                    )}
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
            <ErrorMessage message={message} />
          </div>
          {!hint && (
            <Button
              className={styles.hintBtn}
              variant="outlinePurple"
              onClick={() => setHint(true)}
            >
              Подсказка (-30 XP)
            </Button>
          )}
          <BulletHint
            hint={hint}
            activeExercise={activeExercise}
            onClick={() => {
              setFeedbackModalOpen(true);
            }}
            solution={true}
            onSetSolution={() => setSolution(exercise?.nested_exercises[activeExercise].solution)}
          />
        </div>
        {completedTaskModalOpen && (
          <CompletedTask
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
      <BulletTerminal
        activeExercise={activeExercise}
        correct={correct}
        exercise={exercise}
        solution={solution}
        terminal={terminal}
      />
    </>
  );
}

export default BulletPointExercise;
