import DraggableImg from '@assets/Draggable';
import styles from './styles.module.less';
import { useRef, useState } from 'react';
import cn from 'classnames';

const VertDraggable = ({ parentContainer, resizeContainer, hidden, className, noIcon, mt }) => {
  const [initialPos, setInitialPos] = useState();
  const [initialSize, setInitialSize] = useState();
  const resizableRef = useRef();

  const initial = (e) => {
    e.dataTransfer.setDragImage(resizableRef.current, 0, 0);
    setInitialPos(e.clientY);
    setInitialSize(parentContainer.current.offsetHeight);
  };

  const resize = (e) => {
    const height = parseInt(initialSize) + parseInt(e.clientY - initialPos);
    if (height < 150 || height > 450) {
      return;
    }

    parentContainer.current.style.height = `${height}px`;
    resizeContainer.current.style.height = `${height}px`;
  };

  return (
    <div
      role="separator"
      ref={resizableRef}
      className={cn(className, styles.container, { [styles.noIcon]: noIcon, [styles.mt]: mt })}
      draggable
      onDragStart={initial}
      onDrag={resize}
      style={hidden ? { display: 'none' } : {}}
    />
  );
};

export default VertDraggable;
