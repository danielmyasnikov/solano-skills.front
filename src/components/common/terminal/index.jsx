import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import RegistrationModal from '@components/common/modals/registration/registrationModal';
import 'brace/mode/python';
import 'brace/ext/language_tools';
import 'ace-builds/src-noconflict/theme-monokai';
import Button from '@components/mui/button';
import { useDispatch, useSelector } from 'react-redux';
import { selectTerminal } from '@store/terminal/selector';
import cn from 'classnames';
import Reset from '@assets/Reset.js';
import styles from './styles.module.less';
import './terminal.module.less';
import { checkAnswer, compileShell } from '@store/terminal/actions';
import Plots from '@assets/Plots';
import GraphArrow from '@assets/GraphArrow';
import Draggable from '../draggable';
import { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { Box, Tooltip, Typography } from '@mui/material';

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

const Terminal = ({
  sampleCode,
  solution,
  isGraphRequired,
  correct,
  exerciseId,
  bytePayload,
  onAnswer,
  xp,
  isAuth,
}) => {
  const [value, setValue] = useState();
  const [height, setHeight] = useState(0);
  const [activeBytePayload, setActiveBytePayload] = useState(0);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState('script');
  const wrapperRef = useRef();
  const terminal = useSelector(selectTerminal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (solution) {
      setActiveTab('solution');
    } else {
      setValue(sampleCode);
    }
  }, [sampleCode, solution]);

  useEffect(() => {
    setActiveTab('script');
  }, [sampleCode]);

  useEffect(() => {
    setHeight(wrapperRef?.current?.offsetHeight);
  }, []);

  function onChange(value) {
    setValue(value);
  }

  const handleActiveBytePayload = (action) => {
    if (action === 'add' && activeBytePayload < bytePayload.length - 1) {
      setActiveBytePayload(activeBytePayload + 1);
    }
    if (action === 'sub' && activeBytePayload > 0) {
      setActiveBytePayload(activeBytePayload - 1);
    }
  };

  const OpenNewWindow = () => {
    window.open();
  };

  useEffect(() => {
    setActiveBytePayload(bytePayload.length - 1);
  }, [bytePayload]);

  useEffect(() => {
    if (terminal.kernelId) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [terminal.kernelId]);

  const handleAnswer = () => {
    if (isAuth) {
      onAnswer();
      dispatch(
        compileShell({
          code: activeTab === 'solution' ? solution : value,
          exerciseId: exerciseId,
          kernelId: terminal.kernelId,
          isGraphRequired: isGraphRequired,
          type: 'compileExercise',
        }),
      );
      dispatch(
        checkAnswer(activeTab === 'solution' ? solution : value, exerciseId, isGraphRequired, xp),
      );
    } else {
      setRegistrationModalOpen(true);
    }
  };

  return (
    <div
      className={cn(styles.terminalContainer, {
        [styles.terminalWithGraph]: isGraphRequired && bytePayload.length > 0,
        [styles.terminalFullWidth]: isGraphRequired,
      })}
    >
      {(correct || isDisabled) && (
        <Placeholder>
          {isDisabled && <LoadingText>Загрузка</LoadingText>}
          {correct && <LoadingText className="no-loading">Успешно!</LoadingText>}
        </Placeholder>
      )}
      {registrationModalOpen && (
        <RegistrationModal onClose={() => setRegistrationModalOpen(false)} />
      )}
      <div ref={wrapperRef} className={styles.terminalWrapper}>
        <div className={styles.terminalHeader}>
          <div
            onClick={() => setActiveTab('script')}
            className={cn(activeTab === 'script' ? styles.tabActive : '', styles.tab)}
          >
            script.py
          </div>
          {solution && (
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
            defaultValue={sampleCode}
            value={activeTab === 'solution' ? solution : value}
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
              className={cn(styles.reset, { [styles.disable]: isDisabled || correct })}
              variant={'outlineWhite'}
              onClick={() => {
                if (isAuth) {
                  setValue(sampleCode);
                } else {
                  setRegistrationModalOpen(true);
                }
              }}
              disabled={correct || isDisabled}
            >
              <Reset />
            </Button>
            <Button
              variant={'outlineWhite'}
              onClick={() => {
                if (isAuth) {
                  dispatch(
                    compileShell({
                      code: activeTab === 'solution' ? solution : value,
                      exerciseId: exerciseId,
                      kernelId: terminal.kernelId,
                      isGraphRequired: isGraphRequired,
                      type: 'compileExercise',
                    }),
                  );
                } else {
                  setRegistrationModalOpen(true);
                }
              }}
              disabled={correct || isDisabled}
            >
              Выполнить код
            </Button>
            <Button
              variant="containedWhite"
              onClick={handleAnswer}
              disabled={correct || isDisabled}
            >
              Ответить
            </Button>
          </div>
        </div>
        {isGraphRequired && bytePayload.length > 0 && (
          <div className={styles.resize}>
            <Draggable resizeContainer={wrapperRef} parentContainer={wrapperRef} height={height} />
          </div>
        )}
      </div>
      {isGraphRequired && bytePayload.length > 0 && (
        <div className={styles.bytePayload}>
          <div className={styles.terminalHeader}>
            <div className={cn(styles.tabActive, styles.tab)}>
              Графики
              <a onClick={() => OpenNewWindow()} target="_blank">
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
