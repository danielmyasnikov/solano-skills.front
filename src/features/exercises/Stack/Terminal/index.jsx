import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';

import './terminal.module.less';

import {
  selectKernelId,
  selectTerminal,
  selectTerminalStatus,
} from '../../store/selectors/terminal.selector';
import { checkAnswer, compileShell } from '../../store/actions/terminal.actions';

import Reset from '@assets/Reset';

import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import Editor, { useMonaco } from '@monaco-editor/react';
import styles from './styles.module.less';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice.ts';
import { selectRootExercise } from '@src/features/exercises/store/selectors/exercises.selectors';
import {
  selectCurrentExercise,
  selectExerciseContext,
  selectSolutionHint,
} from '@src/features/exercises/store/selectors/exercise.selectors';
import { selectIsAuth, selectProfile } from '@store/profile/selector';
import { openPleasePayModal, openSignUpModal } from '@store/global/modals';
import VertDraggable from '@components/common/VertDraggable';
import { Preloader } from '@components/mui/Preloader';

const Placeholder = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 18px;
  z-index: 100;
  background-color: rgb(0 0 0 / 15%);
  backdrop-filter: blur(2px);
`;

const LoadingText = styled(Typography)`
  color: white;
  font-family: 'Jost', sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 127%;
  text-align: center;
  white-space: nowrap;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.no-loading {
    &::after {
      display: none !important;
    }
  }

  &::after {
    display: inline-block;
    animation: dotty steps(1, end) 1.5s infinite;
    content: '';
  }

  @keyframes dotty {
    0% {
      content: '';
    }
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  }
`;

const Terminal = () => {
  const rootRef = useRef();
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const monaco = useMonaco();

  const { user_id } = useSelector(selectProfile);
  const terminal = useSelector(selectTerminal);
  const exercise = useSelector(selectCurrentExercise);
  const { used: solutionUsed, content: solutionContent } = useSelector(selectSolutionHint);
  const isAuth = useSelector(selectIsAuth);
  const { completed, xp, code } = useSelector(selectExerciseContext);
  const status = useSelector(selectTerminalStatus);
  const kernelId = useSelector(selectKernelId);
  const rootExercise = useSelector(selectRootExercise);
  const profile = useSelector(selectProfile);

  const isDisabled = !kernelId;

  const [activeTab, setActiveTab] = useState('script');

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('a', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.foreground': '#EDF9FA',
          'editor.background': '#2c2a3f',
          'editorCursor.foreground': '#ffffff',
          'editor.lineHighlightBackground': '#29273b',
          'editorLineNumber.foreground': '#8F908A',
        },
      });
      monaco.editor.setTheme('a');
    }
  }, [monaco]);

  useEffect(() => {
    if (solutionUsed) {
      setActiveTab('solution');
    } else {
      setActiveTab('script');
    }
  }, [solutionUsed]);

  function onChange(val) {
    dispatch(exerciseSlice.actions.updateCode(val));
  }

  useEffect(() => {
    if (terminal.message.status === 'success') {
      dispatch(exerciseSlice.actions.onComplete(undefined));
    }

    if (terminal.message.error) {
      dispatch(exerciseSlice.actions.onError(terminal.message.error));
    }
  }, [terminal]);

  const handleAnswer = () => {
    if (isAuth) {
      const payedTill = new Date(`${profile.payed_till}T00:00:00Z`);
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const isActiveSub = payedTill >= now;
      if (rootExercise.is_free || isActiveSub) {
        dispatch(
          compileShell({
            code: activeTab === 'solution' ? solutionContent : code,
            exerciseId: exercise?.id,
            kernelId: terminal.kernelId,
            isGraphRequired: exercise?.is_graph_required,
            type: 'compileExercise',
          }),
        ).then(() => {
          dispatch(
            checkAnswer({
              code: activeTab === 'solution' ? solutionContent : code,
              exerciseId: exercise?.id,
              isGraphRequired: exercise?.is_graph_required,
              xp,
              userId: user_id,
            }),
          );
        });
      } else {
        dispatch(openPleasePayModal());
      }
    } else {
      dispatch(openSignUpModal());
    }
  };

  return (
    <div ref={rootRef} className={styles.terminalContainer}>
      {((completed && !exercise?.is_graph_required) || isDisabled) && (
        <Placeholder>
          {isDisabled && <LoadingText>Загрузка</LoadingText>}
          {completed && <LoadingText className="no-loading">Успешно!</LoadingText>}
        </Placeholder>
      )}
      <div ref={wrapperRef} className={styles.terminalWrapper}>
        <div className={styles.terminalHeader}>
          <div
            onClick={() => setActiveTab('script')}
            className={cn(activeTab === 'script' ? styles.tabActive : '', styles.tab)}
          >
            script.py
          </div>
          {solutionUsed && (
            <div
              onClick={() => setActiveTab('solution')}
              className={cn(activeTab === 'solution' ? styles.tabActive : '', styles.tab)}
            >
              solution.py
            </div>
          )}
        </div>
        <div className={styles.terminal}>
          <Editor
            language="python"
            theme="a"
            className="editor"
            width="100%"
            defaultValue={exercise?.sample_code}
            value={activeTab === 'solution' ? solutionContent : code}
            options={{
              fontSize: 16,
              wordWrap: 'on',
              snippetSuggestions: 'bottom',
              tabSize: 4,
              quickSuggestions: true,
              readOnly: activeTab === 'solution',
            }}
            onChange={onChange}
          />
          <div className={styles.actions}>
            <Button
              className={cn(styles.reset, { [styles.disable]: isDisabled || completed })}
              variant={'outlineWhite'}
              onClick={() => {
                if (isAuth) {
                  const payedTill = new Date(`${profile.payed_till}T00:00:00Z`);
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  const isActiveSub = payedTill >= now;
                  if (rootExercise.is_free || isActiveSub) {
                    dispatch(exerciseSlice.actions.updateCode(exercise?.sample_code));
                  } else {
                    dispatch(openPleasePayModal());
                  }
                } else {
                  dispatch(openSignUpModal());
                }
              }}
              disabled={completed || isDisabled || status === 'loading'}
            >
              {status === 'loading' ? <Preloader /> : <Reset />}
            </Button>
            <Button
              variant={'outlineWhite'}
              onClick={() => {
                if (isAuth) {
                  const payedTill = new Date(`${profile.payed_till}T00:00:00Z`);
                  const now = new Date();
                  now.setHours(0, 0, 0, 0);
                  const isActiveSub = payedTill >= now;
                  if (rootExercise.is_free || isActiveSub) {
                    dispatch(
                      compileShell({
                        code: activeTab === 'solution' ? solutionContent : code,
                        exerciseId: exercise?.id,
                        kernelId: terminal.kernelId,
                        isGraphRequired: exercise?.is_graph_required,
                        type: 'compileExercise',
                      }),
                    );
                  } else {
                    dispatch(openPleasePayModal());
                  }
                } else {
                  dispatch(openSignUpModal());
                }
              }}
              disabled={completed || isDisabled || status === 'loading'}
            >
              {status === 'loading' ? 'Загрузка...' : 'Выполнить код'}
            </Button>
            {exercise.type !== 'quiz_with_script' && (
              <Button
                variant="containedWhite"
                onClick={handleAnswer}
                disabled={completed || isDisabled || status === 'loading'}
              >
                {status === 'loading' ? 'Загрузка...' : 'Ответить'}
              </Button>
            )}
          </div>
        </div>
        {/*
          exercise?.is_graph_required && bytePayload.length > 0 && (
            <div className={styles.resize}>
              <Draggable
                resizeContainer={wrapperRef}
                parentContainer={wrapperRef}
                className={styles.draggable}
              />
            </div>
          )
        */}
      </div>
      <VertDraggable parentContainer={rootRef} resizeContainer={wrapperRef} />
    </div>
  );
};

export default Terminal;
