import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/ext/language_tools';
import 'ace-builds/src-noconflict/theme-monokai';
import Button from '../../mui/button';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import Reset from '@assets/Reset.js';
import styles from './styles.module.less';
import './terminal.module.less';
import { compileCode } from '../../../store/terminal/actions';

function Terminal({ sampleCode, solution, onCompile, setModalOpen }) {
  const [value, setValue] = useState();
  const [activeTab, setActiveTab] = useState('script');
  const dispatch = useDispatch();
  useEffect(() => {
    if (solution) {
      setActiveTab('solution');
    } else {
      setValue(sampleCode);
    }
  }, [sampleCode, solution]);
  function onChange(value) {
    setValue(value);
  }
  return (
    <>
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
          >
            <Reset />
          </Button>
          <Button
            variant={'outlineWhite'}
            onClick={() => {
              dispatch(compileCode(activeTab === 'solution' ? solution : value));
            }}
          >
            Выполнить код
          </Button>
          <Button
            variant="containedWhite"
            onClick={() => {
              dispatch(compileCode(activeTab === 'solution' ? solution : value));
              setModalOpen();
            }}
          >
            Ответить
          </Button>
        </div>
      </div>
    </>
  );
}

export default Terminal;
