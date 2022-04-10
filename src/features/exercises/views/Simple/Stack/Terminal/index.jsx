import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor from 'react-ace';

import cn from 'classnames';

import 'ace-builds/src-noconflict/theme-monokai';

import 'brace/mode/python';
import 'brace/ext/language_tools';

import './terminal.module.less';

import { selectKernelId, selectTerminal } from '../../../../terminal/selector';
import { checkAnswer, compileShell } from '../../../../terminal/actions';

import Reset from '@assets/Reset';

import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

import styles from './styles.module.less';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import {
  selectCurrentExercise,
  selectExerciseContext,
  selectRootExercise,
  selectSolutionHint,
} from '@src/features/exercises/store/selectors';
import { selectIsAuth, selectProfile } from '@store/profile/selector';
import { openPleasePayModal, openSignUpModal } from '@store/global/modals';
import VertDraggable from '@components/common/VertDraggable';

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

  const { user_id } = useSelector(selectProfile);
  const terminal = useSelector(selectTerminal);
  const exercise = useSelector(selectCurrentExercise);
  const { used: solutionUsed, content: solutionContent } = useSelector(selectSolutionHint);
  const isAuth = useSelector(selectIsAuth);
  const { completed, xp, code } = useSelector(selectExerciseContext);
  const kernelId = useSelector(selectKernelId);
  const rootExercise = useSelector(selectRootExercise);
  const profile = useSelector(selectProfile);

  const isDisabled = !kernelId;

  const [activeTab, setActiveTab] = useState('script');

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
      if (rootExercise.is_free || !!profile.subscription_type) {
        dispatch(
          compileShell({
            code: activeTab === 'solution' ? solutionContent : code,
            exerciseId: exercise?.id,
            kernelId: terminal.kernelId,
            isGraphRequired: exercise?.is_graph_required,
            type: 'compileExercise',
          }),
        );
        dispatch(
          checkAnswer(
            activeTab === 'solution' ? solutionContent : code,
            exercise?.id,
            exercise?.is_graph_required,
            xp,
            user_id,
          ),
        );
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
          <AceEditor
            mode="python"
            theme="monokai"
            className="editor"
            width="100%"
            showGutter
            highlightActiveLine
            defaultValue={exercise?.sample_code}
            value={activeTab === 'solution' ? solutionContent : code}
            readOnly={activeTab === 'solution'}
            wrapEnabled
            fontSize="16px"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              wrap: true,
              behavioursEnabled: true,
              newLineMode: true,
              showGutter: true,
              minLines: 1,
              wrapBehavioursEnabled: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
          />
          <div className={styles.actions}>
            <Button
              className={cn(styles.reset, { [styles.disable]: isDisabled || completed })}
              variant={'outlineWhite'}
              onClick={() => {
                if (isAuth) {
                  if (rootExercise.is_free || !!profile.subscription_type) {
                    dispatch(exerciseSlice.actions.updateCode(exercise?.sample_code));
                  } else {
                    dispatch(openPleasePayModal());
                  }
                } else {
                  dispatch(openSignUpModal());
                }
              }}
              disabled={completed || isDisabled}
            >
              <Reset />
            </Button>
            <Button
              variant={'outlineWhite'}
              onClick={() => {
                if (isAuth) {
                  if (rootExercise.is_free || !!profile.subscription_type) {
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
              disabled={completed || isDisabled}
            >
              Выполнить код
            </Button>
            {exercise.type !== 'quiz_with_script' && (
              <Button
                variant="containedWhite"
                onClick={handleAnswer}
                disabled={completed || isDisabled}
              >
                Ответить
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
