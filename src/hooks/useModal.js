// TODO: refactoring
import { useCallback, useState } from 'react';

export const useModal = (Component) => {
  const [isOpen, setOpen] = useState(false);

  function open() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  const Modal = useCallback(
    ({ children }) => {
      return <>{isOpen && <Component onClose={close}>{children}</Component>}</>;
    },
    [isOpen, close],
  );

  return {
    Modal,
    open,
    close,
    isOpen,
  };
};
