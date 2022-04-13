import { useEffect, useState } from 'react';

export const useShell = ({ ref, submitCallback, isMulti }: any) => {
  const [value, setValue] = useState('');
  const [currentLine, setCurrentLine] = useState(1);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [commandHistory, setCommandHistory] = useState<
    {
      line: number;
      code: string;
    }[]
  >([]);

  useEffect(() => {
    ref.current.selectionStart = ref.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  function toggleCommandHistory(direction: any) {
    let newIndex = currentCommandIndex + direction;

    if (newIndex < -1) newIndex = -1;
    if (newIndex >= commandHistory.length) newIndex = commandHistory.length - 1;

    if (newIndex !== currentCommandIndex) {
      setCurrentCommandIndex(newIndex);
    }

    if (newIndex > -1) {
      setValue(commandHistory[commandHistory.length - 1 - newIndex].code);
    } else {
      setValue('');
    }
  }

  function acceptInput(e: any) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      submitCallback({
        line: currentLine,
        code: value,
      });
      commandHistory.push({
        line: currentLine,
        code: value,
      });
      setCurrentLine(currentLine + 1);
      setValue('');
    } else if (e.keyCode === 9) {
      e.preventDefault();

      const { selectionStart, selectionEnd } = e.target;
      setValue(
        (prevState) =>
          prevState.substring(0, selectionStart) + '\t' + prevState.substring(selectionEnd),
      );
      setCursorPosition(selectionStart + 1);
    } else if (e.keyCode === 38 && !isMulti) {
      e.preventDefault();
      toggleCommandHistory(1);
    } else if (e.keyCode === 40 && !isMulti) {
      e.preventDefault();
      toggleCommandHistory(-1);
    }
  }

  function onChange(e: any) {
    setValue(e.target.value);
  }

  return {
    line: currentLine,
    code: value,
    onChange,
    acceptInput,
  };
};
