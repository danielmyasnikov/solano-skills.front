import { useState } from 'react';
import cn from 'classnames';
import styles from './styles.module.less';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startEnvironment, executeBashShell } from '@store/bashShell/actions';
import { selectBashShell } from '@store/bashShell/selector';

const UnixShell = () => {
  const [activeTab, setActiveTab] = useState('terminal');
  const [isEditFile, setIsEditFile] = useState(true);
  const [value, setValue] = useState(`<span class="${cn(styles.caret, styles.caretEnd)}"></span>`);
  const dispatch = useDispatch();
  const bashShell = useSelector(selectBashShell);
  const inputRef = useRef(null);
  const contentRef = useRef(null);

  const handleCaretPos = ({ direction }) => {
    const { selectionStart, value } = inputRef.current;
    let left = '';
    let center = '';
    let right = '';
    let maxSymbolsCountInRow = contentRef.current.offsetWidth / 9.61;
    const diff = 1;
    if (direction === 'left') {
      console.log(selectionStart);
      left = value.substring(0, selectionStart - 1);
      center = value.substring(selectionStart - 1, selectionStart);
      right = value.substring(selectionStart, value.length);
      if (selectionStart > 0) {
        setValue(
          `${left}<span class="${cn(styles.caret, {
            [styles.caretEnd]: center.length === 0,
          })}">${center}</span>${right}`,
        );
      }
    }
    if (direction === 'right') {
      left = value.substring(0, selectionStart + diff);
      center = value.substring(selectionStart + 1 + diff, selectionStart + diff);
      right = value.substring(selectionStart + 1 + diff, value.length);
      if (selectionStart !== value.length || selectionStart == 0) {
        setValue(
          `${left}<span class="${cn(styles.caret, {
            [styles.caretEnd]: center == '',
          })}">${center}</span>${right}`,
        );
      } else {
        setValue(
          `${left} ${right} <span class="${cn(styles.caret, {
            [styles.caretEnd]: center == '',
          })}">${center}</span>`,
        );
      }
    }
    if (direction === 'up') {
      left = value.substring(0, selectionStart - maxSymbolsCountInRow + 1);
      center = value.substring(
        selectionStart - maxSymbolsCountInRow + 1,
        selectionStart - maxSymbolsCountInRow + 2,
      );
      right = value.substring(selectionStart - maxSymbolsCountInRow + 2, value.length);
      if (maxSymbolsCountInRow < value.length) {
        inputRef.current.setSelectionRange(
          selectionStart - maxSymbolsCountInRow + 1,
          selectionStart - maxSymbolsCountInRow + 1,
        );
        setValue(
          `${left}<span class="${cn(styles.caret, {
            [styles.caretEnd]: center.length === 0,
          })}">${center}</span>${right}`,
        );
      }
    }
    if (direction === 'down') {
      left = value.substring(0, selectionStart + maxSymbolsCountInRow);
      center = value.substring(
        selectionStart + maxSymbolsCountInRow,
        selectionStart + maxSymbolsCountInRow + 1,
      );
      right = value.substring(selectionStart + maxSymbolsCountInRow + 1, value.length);
      if (maxSymbolsCountInRow < value.length) {
        inputRef.current.setSelectionRange(
          selectionStart + maxSymbolsCountInRow,
          selectionStart + maxSymbolsCountInRow + 1,
        );
        setValue(
          `${left}<span class="${cn(styles.caret, {
            [styles.caretEnd]: center.length === 0,
          })}">${center}</span>${right}`,
        );
      }
    }
  };

  const handleKey = (e) => {
    const { ctrlKey, code } = e;
    if (ctrlKey && code === 'KeyC') {
      inputRef.current.value = `${inputRef.current.value}`;
      setValue(`${value}`);
    }
    if (ctrlKey && code === 'KeyV') {
      inputRef.current.value = `${inputRef.current.value}`;
      setValue(`${value}`);
    }
    if (code === 'ArrowLeft') {
      handleCaretPos({ direction: 'left' });
    }
    if (code === 'ArrowRight') {
      handleCaretPos({ direction: 'right' });
    }
    if (code === 'ArrowUp') {
      e.preventDefault();
      handleCaretPos({ direction: 'up' });
    }
    if (code === 'ArrowDown') {
      e.preventDefault();
      handleCaretPos({ direction: 'down' });
    }
    if (code === 'Enter') {
      dispatch(
        executeBashShell({
          environmentId: bashShell.environmentId,
          command: inputRef.current.value,
        }),
      );
      setValue('');
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    dispatch(startEnvironment());
  }, []);

  const handleValue = (e) => {
    const { value, selectionStart } = e.target;
    let diff = 0;
    handleCaretPos({ direction: 'right' });
    setValue(value);
    let left = value.substring(0, selectionStart + diff);
    let center = value.substring(selectionStart + 1 + diff, selectionStart + diff);
    let right = value.substring(selectionStart + 1 + diff, value.length);
    setValue(
      `${left}<span class="${cn(styles.caret, {
        [styles.caretEnd]: center.length === 0,
      })}">${center}</span>${right}`,
    );
  };

  const handleFocus = () => {
    inputRef.current.focus();
  };

  // useEffect(() => {
  //   const socket = new WebSocket('url');
  //   socket.onopen = () => {
  //     socket.send({
  //       id: '',
  //     });
  //   };
  // });

  return (
    <div className={styles.shell}>
      <div className={styles.terminalHeader}>
        <div
          onClick={() => setActiveTab('terminal')}
          className={cn(activeTab === 'terminal' ? styles.tabActive : '', styles.tab)}
        >
          Terminal
        </div>
      </div>
      <div className={styles.output} onClick={handleFocus}>
        <div>
          {bashShell.outputs.map((item) => (
            <div>{item.output || item.error}</div>
          ))}
        </div>
        <div className={styles.inputWrap}>
          <span>$&nbsp;</span>
          <input
            tabIndex={0}
            className={styles.input}
            ref={inputRef}
            onKeyDown={handleKey}
            onChange={handleValue}
          />
          <div
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: value }}
            className={styles.content}
          />
        </div>
      </div>
    </div>
  );
};

export default UnixShell;
