import { useEffect, useState } from 'react';

const key = 'warning';

export const useMobileWarning = () => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(key)) {
      setHidden(false);
    }
  }, []);

  const onClose = () => {
    localStorage.setItem(key, 'hidden');
    setHidden(true);
  };

  return { hidden, onClose };
};
