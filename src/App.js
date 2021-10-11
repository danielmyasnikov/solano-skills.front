import AceEditor from "react-ace";
import { useEffect } from "react";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import { SnippetManager } from "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/python";
import { useState } from "react";
import axios from "axios";
import "ace-builds/src-noconflict/theme-cobalt";

export default function App() {
  const [value, setValue] = useState("");
  function onChange(newValue) {
    setValue(newValue);
  }
  useEffect(() => {
    console.log(SnippetManager);
  });

  return (
    <div className="App">
      <AceEditor
        mode="python"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        theme="cobalt"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showGutter: true,
          highlightActiveLine: true,
        }}
        tabSize="4"
      />
      <button
        onClick={async () => {
          try {
            await axios.post("http://localhost:5000/api/", {
              code: value,
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}
