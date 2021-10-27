import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/ext/language_tools';
import Button from '../button';
import { useDispatch } from 'react-redux';

import Reset from 'assets/Reset.svg';
import styles from './styles.module.less';
import './terminal.module.less';
import { compileCode, COMPILE_CODE } from '../../../store/terminal/actions';

function Terminal({ sampleCode, readonly, onCompile, setModalOpen }) {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setValue(sampleCode);
  }, [sampleCode]);
  function onChange(value) {
    setValue(value);
  }

  return (
    <div className={styles.terminal}>
      <AceEditor
        mode="python"
        className="editor"
        width="100%"
        height="100%"
        showGutter={true}
        highlightActiveLine={true}
        defaultValue={sampleCode}
        value={value}
        readOnly={readonly}
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
            onCompile()
            dispatch(compileCode(value));
          }}
        >
          Выполнить код
        </Button>
        <Button
          variant={'fillWhite'}
          onClick={() => {
            dispatch(compileCode(value));
            setModalOpen();
          }}
        >
          Ответить
        </Button>
      </div>
    </div>
  );
}

export default Terminal;
