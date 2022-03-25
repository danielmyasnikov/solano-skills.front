import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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

import { useMobileWarning } from '@components/exercise/hooks/useMobileWarning';

import { selectExercise } from '@store/exercise/selector';

import styles from './styles.module.less';
import cn from 'classnames';
import { Sidebar } from '@components/exercise/views/Simple/Sidebar';
import { selectTerminal } from '@store/terminal/selector';
import { sendAnswer } from '@store/exercise/actions';
import * as AuthStore from '@store/auth';
import { getProfile } from '@store/profile/actions';

function SimpleExercise({ onSubmit, isAuth }) {
  const dispatch = useDispatch();

  const errorRef = useRef();

  const exercise = useSelector(selectExercise);
  const terminal = useSelector(selectTerminal);
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const { exerciseId } = useParams();

  // terminal
  const [errorMessage, setErrorMessage] = useState('');
  const [bytePayload, setBytePayload] = useState([]);

  const [sidebar, setSidebar] = useState(true);
  const { hidden: mobileWarningIsHidden, onClose: onCloseMobileWarning } = useMobileWarning();

  // xp
  const [xp, setXp] = useState(exercise?.xp);
  // solution
  const [solution, setSolution] = useState('');
  // hint
  const [hint, setHint] = useState(false);
  const [answerHint, setAnswerHint] = useState(true);
  const [hintQuestion, setHintQuestion] = useState(true);
  const [withoutHint, setWithoutHint] = useState(false);

  const hintValue = useMemo(() => Math.ceil(exercise?.xp * 0.3), [exercise]);
  const answerHintValue = exercise?.xp - hintValue;
  // completed
  const [completed, setCompleted] = useState(false);
  // modals
  const [feedbackModal, setFeedbackModal] = useState(false);

  useEffect(() => {
    // xp
    setXp(exercise?.xp);
    // solution
    setSolution('');
    // hint
    setHint(false);
    setWithoutHint(!exercise?.hint);
    setAnswerHint(true);
    setHintQuestion(true);
    // terminal
    setBytePayload([]);
    setErrorMessage('');
  }, [exercise]);

  useEffect(() => {
    if (terminal.message.status === 'success') {
      setCompleted(true);
      dispatch(sendAnswer(exercise?.slug, exercise?.course_slug, xp, headers));
      dispatch(getProfile({ headers }));
    }

    if (terminal.message.error) {
      setErrorMessage(terminal.message.error);
    }

    if (terminal.bytePayload) {
      setBytePayload([...bytePayload, { payload: terminal.bytePayload }]);
    }
  }, [terminal]);

  useEffect(() => {
    if (!!errorMessage) {
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [errorMessage]);

  const renderStack = () => {
    switch (exercise?.stack_type) {
      case 'shell':
        return <UnixShell exerciseId={exerciseId} />;
      case 'python':
        return (
          <>
            <Terminal
              solution={solution}
              exercise={exercise}
              correct={completed}
              isAuth={isAuth}
              xp={xp}
              bytePayload={bytePayload}
              isGraphRequired={exercise?.is_graph_required}
            />
            <Output exercise={exercise} variant="outputContainer" />
          </>
        );
      default:
        return (
          <>
            <Terminal
              solution={solution}
              exercise={exercise}
              correct={completed}
              isAuth={isAuth}
              xp={xp}
              bytePayload={bytePayload}
              isGraphRequired={exercise?.is_graph_required}
            />
            <Output exercise={exercise} variant="outputContainer" />
          </>
        );
    }
  };

  return (
    <>
      {!mobileWarningIsHidden && <WarningMobile handleClose={onCloseMobileWarning} />}

      <div className={cn(styles.layout, { [styles.folded]: !sidebar })}>
        <div className={styles.content}>
          <Sidebar
            open={sidebar}
            toggleSidebar={() => setSidebar(!sidebar)}
            xp={xp}
            exercise={exercise}
          />
          <ErrorMessage message={errorMessage} />
          <div ref={errorRef} style={{ float: 'left', clear: 'both' }} />
          {terminal.kernelId && sidebar && (
            <>
              {!hint && !withoutHint && (
                <Button
                  className={styles.hintBtn}
                  variant="outlinePurple"
                  onClick={() => {
                    setHint(true);
                    setXp(xp - hintValue);
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
                  setFeedbackModal(true);
                  setHintQuestion(false);
                }}
                exercise={exercise}
                hintQuestion={hintQuestion}
                setHintQuestion={setHintQuestion}
                onAnswer={() => {
                  setHint(true);
                  setXp(xp - answerHintValue);
                }}
                answerHintValue={answerHintValue}
                solution={solution}
                onSetSolution={() => setSolution(exercise?.solution)}
              />
            </>
          )}
        </div>
        {completed && (
          <CompletedTask
            correctMessage={exercise?.correct_message}
            xp={xp}
            onClose={() => {
              setCompleted(false);
            }}
            onClick={() => {
              onSubmit();
              setCompleted(false);
            }}
          />
        )}
      </div>
      <div className={styles.terminal}>{renderStack()}</div>

      {feedbackModal && <FeedbackModalComponent onClose={() => setFeedbackModal(false)} />}
    </>
  );
}

export default SimpleExercise;
