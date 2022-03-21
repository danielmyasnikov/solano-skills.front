import { useSelector } from 'react-redux';
import { selectTerminal } from '@store/terminal/selector';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';

export const useTerminal = (exercise, onSuccess) => {
  const errorRef = useRef();

  const { search } = useLocation();

  const terminal = useSelector(selectTerminal);

  const [errorMessage, setMessage] = useState('');
  const [isUnixShell, setIsUnixShell] = useState(false);

  const [bytePayload, setBytePayload] = useState([]);

  useEffect(() => {
    setBytePayload([]);
    setMessage('');
  }, [exercise]);

  useEffect(() => {
    if (search === '?is_unix_shell') {
      setIsUnixShell(true);
    }
  }, [search]);

  useEffect(() => {
    if (terminal.message.status === 'success') {
      onSuccess();
    }

    if (terminal.message.error) {
      setMessage(terminal.message.error);
      errorRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setMessage('');
    }

    if (terminal.bytePayload) {
      setBytePayload([...bytePayload, { payload: terminal.bytePayload }]);
    }
  }, [terminal]);

  return {
    errorRef,
    errorMessage,
    bytePayload,
    isUnixShell,
  };
};
