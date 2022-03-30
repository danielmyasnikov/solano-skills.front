import DraggableImg from '@assets/Draggable';
import styles from './styles.module.less';
import { useRef, useState } from 'react';
import cn from 'classnames';

const Draggable = ({ parentContainer, resizeContainer, hidden, className, noIcon, mt }) => {
  const [initialPos, setInitialPos] = useState();
  const [initialSize, setInitialSize] = useState();
  const resizableRef = useRef();

  const initial = (e) => {
    e.dataTransfer.setDragImage(resizableRef.current, 0, 0);
    setInitialPos(e.clientX);
    setInitialSize(parentContainer.current.offsetWidth);
  };

  const resize = (e) => {
    resizeContainer.current.style.width = `${
      parseInt(initialSize) + parseInt(e.clientX - initialPos)
    }px`;
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
    >
      <div className={styles.draggable}>
        <DraggableImg />
      </div>
    </div>
  );
};

export default Draggable;
