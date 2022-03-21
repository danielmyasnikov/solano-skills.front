import { useEffect, useRef, useState } from 'react';

export const useDraggableContent = () => {
  const layoutRef = useRef();

  const contentRef = useRef();

  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(contentRef?.current?.offsetHeight);
  }, []);

  return { height, contentRef, layoutRef };
};
