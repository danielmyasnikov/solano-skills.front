import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AceEditor from 'react-ace';

import cn from 'classnames';

import 'ace-builds/src-noconflict/theme-monokai';

import 'brace/mode/python';
import 'brace/ext/language_tools';

import './terminal.module.less';

import RegistrationModal from '@components/common/modals/registration/registrationModal';

import Button from '@components/mui/button';
import Draggable from '@components/common/draggable';

import { selectKernelId, selectTerminal } from '@store/terminal/selector';
import { checkAnswer, compileShell } from '@store/terminal/actions';

import Plots from '@assets/Plots';
import GraphArrow from '@assets/GraphArrow';
import Reset from '@assets/Reset';

import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import styles from './styles.module.less';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import {
  selectCurrentExercise,
  selectExerciseContext,
  selectSolutionHint,
} from '@src/features/exercises/store/selectors';
import { selectIsAuth } from '@store/profile/selector';
import { exercisesSlice } from '@src/features/exercises/store/slices/exercises.slice';

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
  const wrapperRef = useRef();
  const dispatch = useDispatch();

  const terminal = useSelector(selectTerminal);
  const exercise = useSelector(selectCurrentExercise);
  const { used: solutionUsed, content: solutionContent } = useSelector(selectSolutionHint);
  const isAuth = useSelector(selectIsAuth);
  const { completed, xp } = useSelector(selectExerciseContext);
  const kernelId = useSelector(selectKernelId);

  const [bytePayload, setBytePayload] = useState([]);
  const [value, setValue] = useState();
  const [height, setHeight] = useState(0);
  const [activeBytePayload, setActiveBytePayload] = useState(0);
  const isDisabled = !kernelId;

  const [activeTab, setActiveTab] = useState('script');

  useEffect(() => {
    if (solutionUsed) {
      setActiveTab('solution');
    } else {
      setActiveTab('script');
      setValue(exercise?.sample_code);
    }
  }, [exercise?.sample_code, solutionUsed]);

  useEffect(() => {
    setHeight(wrapperRef?.current?.offsetHeight);
  }, []);

  function onChange(val) {
    setValue(val);
  }

  const handleActiveBytePayload = (action) => {
    if (action === 'add' && activeBytePayload < bytePayload.length - 1) {
      setActiveBytePayload(activeBytePayload + 1);
    }
    if (action === 'sub' && activeBytePayload > 0) {
      setActiveBytePayload(activeBytePayload - 1);
    }
  };

  const openNewWindow = () => {
    const image = new Image();
    image.src = bytePayload[activeBytePayload]?.payload;
    const w = window.open('');
    w.document.write(image.outerHTML);
  };

  useEffect(() => {
    setActiveBytePayload(bytePayload.length - 1);
  }, [bytePayload]);

  useEffect(() => {
    if (terminal.message.status === 'success') {
      dispatch(exerciseSlice.actions.onComplete(undefined));
    }

    if (terminal.message.error) {
      dispatch(exerciseSlice.actions.onError(terminal.message.error));
    }

    if (terminal.bytePayload) {
      setBytePayload([...bytePayload, { payload: terminal.bytePayload }]);
    }
  }, [terminal]);

  const handleAnswer = () => {
    if (isAuth) {
      dispatch(
        compileShell({
          code: activeTab === 'solution' ? solutionContent : value,
          exerciseId: exercise?.id,
          kernelId: terminal.kernelId,
          isGraphRequired: exercise?.is_graph_required,
          type: 'compileExercise',
        }),
      );
      dispatch(
        checkAnswer(
          activeTab === 'solution' ? solutionContent : value,
          exercise?.id,
          exercise?.is_graph_required,
          xp,
        ),
      );
    } else {
      dispatch(exercisesSlice.actions.openSignupModal({}));
    }
  };

  return (
    <div
      className={cn(styles.terminalContainer, {
        [styles.terminalWithGraph]: exercise?.is_graph_required && bytePayload.length > 0,
        [styles.terminalFullWidth]: exercise?.is_graph_required,
      })}
    >
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
            height="calc(100% - 71px)"
            showGutter
            highlightActiveLine
            defaultValue={exercise?.sample_code}
            value={activeTab === 'solution' ? solutionContent : value}
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
                  setValue(exercise?.sample_code);
                } else {
                  dispatch(exercisesSlice.actions.openSignupModal({}));
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
                  dispatch(
                    compileShell({
                      code: activeTab === 'solution' ? solutionContent : value,
                      exerciseId: exercise?.id,
                      kernelId: terminal.kernelId,
                      isGraphRequired: exercise?.is_graph_required,
                      type: 'compileExercise',
                    }),
                  );
                } else {
                  dispatch(exercisesSlice.actions.openSignupModal({}));
                }
              }}
              disabled={completed || isDisabled}
            >
              Выполнить код
            </Button>
            <Button
              variant="containedWhite"
              onClick={handleAnswer}
              disabled={completed || isDisabled}
            >
              Ответить
            </Button>
          </div>
        </div>
        {exercise?.is_graph_required && bytePayload.length > 0 && (
          <div className={styles.resize}>
            <Draggable
              resizeContainer={wrapperRef}
              parentContainer={wrapperRef}
              className={styles.draggable}
            />
          </div>
        )}
      </div>
      {exercise?.is_graph_required && bytePayload.length > 0 && (
        <div className={styles.bytePayload}>
          <div className={styles.terminalHeader}>
            <div className={cn(styles.tabActive, styles.tab)}>
              Графики
              <a onClick={() => openNewWindow()} target="_blank">
                <Plots />
              </a>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.graph}>
              <img src={bytePayload[activeBytePayload]?.payload} />
            </div>
            <div className={styles.btnWrap}>
              <button
                className={cn({ [styles.disable]: activeBytePayload === 0 })}
                onClick={() => handleActiveBytePayload('sub')}
              >
                <GraphArrow />
                Назад
              </button>
              <div className={styles.count}>
                {activeBytePayload + 1}
                <span className={styles.disable}>/{bytePayload.length}</span>
              </div>
              <button
                className={cn({ [styles.disable]: activeBytePayload === bytePayload.length - 1 })}
                onClick={() => handleActiveBytePayload('add')}
              >
                Вперед
                <GraphArrow />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminal;
