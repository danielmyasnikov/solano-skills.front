import React from "react";
import AceEditor from "react-ace";

import ace from "brace";
import 'brace/mode/python';
import 'brace/ext/language_tools';
import "ace-builds/src-noconflict/theme-monokai";

function Terminal() {
  ace.define('ace/snippets/python', ['require', 'exports', 'module'], (e,t,n) => {
    (t.snippetText = snippet), (t.scope = 'python');
  });
  function onChange(newValue) {
    console.log("change", newValue);
  }
  return (
    <AceEditor
      mode="python"
      theme="monokai"
      width="100%"
      height="100%"
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
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
  );
}

export default Terminal;
