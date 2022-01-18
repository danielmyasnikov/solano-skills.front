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
  return (
    <div className={styles.terminalContainer}>
      {registrationModalOpen && <RegistrationModal />}
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
      <div
        className={cn(styles.terminalWrapper, {
          [styles.terminalWithGraph]: bytePayload && isGraphRequired,
        })}
      >
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
                if (isAuth) {
                  dispatch(
                    compileCode(
                      activeTab === 'solution' ? solution : value,
                      exerciseId,
                      isGraphRequired,
                    ),
                  );
                } else {
                  // setRegistrationModalOpen(true)
                }
              }}
              disabled={correct}
            >
              Выполнить код
            </Button>
            <Button
              variant="containedWhite"
              onClick={() => {
                if (isAuth) {
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
                } else {
                  // setRegistrationModalOpen(true)
                }
              }}
              disabled={correct}
            >
              Ответить
            </Button>
          </div>
        </div>
        {isGraphRequired && bytePayload && (
          <div className={styles.bytePayload}>
            <img src={bytePayload} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Terminal;
