import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getExercise } from '@store/exercise/actions';

import { selectExercise } from '@store/exercise/selector';
import { QuizHint } from '@components/hint';
import ErrorMessage from '@components/common/errorMessage';
import Output from '@components/common/output';
import { sendAnswer } from '@store/exercise/actions';
import * as AuthStore from '@store/auth';
import { useModal } from '@src/hooks/useModal';

import { FeedbackModal as FeedbackModalComponent } from '@components/common/modals/feedback';
import CompletedTask from '@components/common/modals/completedTask';

import styles from './styles.module.less';
import { useHint } from '@components/exercise/hooks/useHint';
import { Sidebar } from '@components/exercise/views/Simple/Sidebar';
import cn from 'classnames';
import RegistrationModal from '@components/common/modals/registration/registrationModal';
import { useSolution } from '@components/exercise/hooks/useSolution';
import { useXp } from '@components/exercise/hooks/useXp';
import UnixShell from '@components/common/unixshell';
import { getProfile } from '@store/profile/actions';

function QuizTemplate({ onSubmit, isAuth }) {
  const [sidebar, setSidebar] = useState(true);
  const toggleSidebar = () => setSidebar(!sidebar);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  const errorRef = useRef();

  const dispatch = useDispatch();

  const exercise = useSelector(selectExercise);
  const { courseId, exerciseId } = useParams();
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const [answer, setAnswer] = useState({ value: '', correct: false, error: 'Выберите ответ' });
  const [errorMessage, setErrorMessage] = useState();

  const [winnerXp, setWinnerXp] = useState(exercise?.xp);

  const { solution, showSolution } = useSolution(exercise);

  const {
    hint,
    withoutHint,
    showHint,
    hintValue,
    setHintQuestion,
    hintQuestion,
    answerHint,
    setAnswerHint,
    answerHintValue,
  } = useHint(exercise);
  const { xp, onHintXp } = useXp(exercise, hintValue, answerHintValue);

  const [completedTaskModalOpen, setCompletedTaskModalOpen] = useState(false);
  const { Modal: FeedbackModal, open: openFeedbackModal } = useModal(FeedbackModalComponent);

  const handleAnswer = (item) => {
    setAnswer(item);
  };
  const handleHelp = () => {
    onHintXp();
    showHint();
  };

  useEffect(() => {
    if (!!errorMessage) {
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [errorMessage]);

  useEffect(() => {
    setAnswer({ value: '', correct: false, error: 'Выберите ответ' });
  }, [exercise]);

  useEffect(() => {
    dispatch(getExercise(courseId, exerciseId, headers));
  }, []);

  const checkAnswer = () => {
    if (isAuth) {
      if (answer.correct) {
        setErrorMessage('');
        setCompletedTaskModalOpen(true);
        setWinnerXp(xp);
        dispatch(sendAnswer(exercise?.slug, exercise?.course_slug, xp, headers));
        dispatch(getProfile({ headers }));
      } else {
        setErrorMessage(answer.error);
      }
    } else {
      setRegistrationModalOpen(true);
    }
  };

  const renderStack = () => {
    switch (exercise.stack_type) {
      case 'shell':
        return <UnixShell exerciseId={exerciseId} />;
      case 'python':
        return <Output exercise={exercise} variant="quizOutputContainer" />;
      default:
        return <Output exercise={exercise} variant="quizOutputContainer" />;
    }
  };

  return (
    <>
      <div className={cn(styles.layout, { [styles.folded]: !sidebar })}>
        <div className={styles.content}>
          <Sidebar
            exercise={exercise}
            xp={xp}
            hintValue={hintValue}
            answer={answer}
            handleAnswer={handleAnswer}
            onSubmit={() => setCompletedTaskModalOpen(true)}
            open={sidebar}
            toggleSidebar={toggleSidebar}
            hint={hint}
            handleHelp={handleHelp}
            withoutHint={withoutHint}
            showHint={showHint}
            checkAnswer={checkAnswer}
          />
          <ErrorMessage message={errorMessage} />
          <div ref={errorRef} style={{ float: 'left', clear: 'both' }} />
          {sidebar && (
            <QuizHint
              hint={hint}
              onClick={openFeedbackModal}
              solution={solution}
              answerHint={answerHint}
              setAnswerHint={setAnswerHint}
              hintQuestion={hintQuestion}
              setHintQuestion={setHintQuestion}
              answerHintValue={answerHintValue}
              onSetSolution={showSolution}
            />
          )}
        </div>
        {completedTaskModalOpen && (
          <CompletedTask
            correctMessage={exercise?.correct_message}
            xp={winnerXp}
            onClose={() => {
              onSubmit();
              setCompletedTaskModalOpen(false);
            }}
            onClick={() => {
              onSubmit();
              setCompletedTaskModalOpen(false);
            }}
          />
        )}
      </div>
      <div className={styles.terminal}>{renderStack()}</div>

      <FeedbackModal />
      {registrationModalOpen && (
        <RegistrationModal onClose={() => setRegistrationModalOpen(false)} />
      )}
    </>
  );
}

export default QuizTemplate;
