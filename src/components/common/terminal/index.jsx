import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import RegistrationModal from '@components/common/modals/registration/registrationModal';
import 'brace/mode/python';
import 'brace/ext/language_tools';
import 'ace-builds/src-noconflict/theme-monokai';
import Button from '@components/mui/button';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import Reset from '@assets/Reset.js';
import styles from './styles.module.less';
import './terminal.module.less';
import { checkAnswer, compileCode } from '@store/terminal/actions';
import Plots from '@assets/Plots';
import GraphArrow from '@assets/GraphArrow';

function Terminal({
  sampleCode,
  solution,
  isGraphRequired,
  correct,
  exerciseId,
  bytePayload,
  isAuth,
}) {
  const [value, setValue] = useState();
  const [activeBytePayload, setActiveBytePayload] = useState(0);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('script');
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

  return (
    <div
      className={cn(styles.terminalContainer, {
        [styles.terminalWithGraph]: isGraphRequired && bytePayload.length > 0,
      })}
    >
      {registrationModalOpen && <RegistrationModal />}
      <div className={styles.terminalWrapper}>
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
            height="100%"
            showGutter={true}
            highlightActiveLine={true}
            defaultValue={sampleCode}
            value={activeTab === 'solution' ? solution : value}
            readOnly={activeTab === 'solution' ? true : false}
            wrapEnabled={true}
            fontSize="16px"
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 4,
            }}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
          />
          <div className={styles.actions}>
            <Button
              className={styles.reset}
              variant={'outlineWhite'}
              onClick={() => {
                setValue(sampleCode);
              }}
              disabled={correct}
            >
              <Reset className={cn(correct ? styles.disable : '')} />
            </Button>
            <Button
              variant={'outlineWhite'}
              onClick={() => {
                // if (isAuth) {
                dispatch(
                  compileCode(
                    activeTab === 'solution' ? solution : value,
                    exerciseId,
                    isGraphRequired,
                  ),
                );
                // } else {
                //   setRegistrationModalOpen(true);
                // }
              }}
              disabled={correct}
            >
              Выполнить код
            </Button>
            <Button
              variant="containedWhite"
              onClick={() => {
                // if (isAuth) {
                dispatch(
                  compileCode(
                    activeTab === 'solution' ? solution : value,
                    exerciseId,
                    isGraphRequired,
                  ),
                );
                dispatch(
                  checkAnswer(
                    activeTab === 'solution' ? solution : value,
                    exerciseId,
                    isGraphRequired,
                  ),
                );
                // } else {
                //   setRegistrationModalOpen(true)
                // }
              }}
              disabled={correct}
            >
              Ответить
            </Button>
          </div>
        </div>
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
}

export default Terminal;
