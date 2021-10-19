import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";

import ace from "brace";
import "brace/mode/python";
import "brace/ext/language_tools";
import Button from "../common/button";
import { useDispatch } from "react-redux";
import { COMPILE_CODE } from "../../store/terminal/actions";

import Reset from 'assets/Reset.svg'
import styles from "./styles.module.less";
import "./terminal.module.less";

function Terminal({ sampleCode, readonly }) {
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setValue(sampleCode)
  }, [sampleCode])
  function onChange(value) {
    setValue(value);
  }

  ace.define(
    "ace/snippets/python",
    ["require", "exports", "module"],
    (e, t, n) => {
      (t.snippetText = snippet), (t.scope = "python");
    }
  );

  return (
    <div className={styles.terminal}>
      <AceEditor
        mode="python"
        theme="monokai"
        className='editor'
        width="100%"
        height="100%"
        showPrintMargin={true}
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
        editorProps={{ $blockScrolling: true }}
      />
      <div className={styles.actions}>
        <Button
          variant={"outline"}
          className={styles.btnOutline}
          onClick={() => {
            setValue(sampleCode)
          }}
        >
          <Reset />
        </Button>
        <Button
          variant={"outline"}
          className={styles.btnOutline}
          onClick={() => {
            dispatch({
              type: COMPILE_CODE,
              payload: {
                code: value,
              },
            });
          }}
        >
          Выполнить код
        </Button>
        <Button
          variant={"fill"}
          className={styles.btnFill}
          onClick={() => {
            dispatch({
              type: COMPILE_CODE,
              payload: {
                code: value,
              },
            });
          }}
        >
          Ответить
        </Button>
      </div>
    </div>
  );
}

export default Terminal;
