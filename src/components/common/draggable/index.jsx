import DraggableImg from '@assets/Draggable';
import styles from './styles.module.less';
import { useRef, useState } from 'react';

const Draggable = ({ parentContainer, resizeContainer, height }) => {
  const [initialPos, setInitialPos] = useState();
  const [initialSize, setInitialSize] = useState();
  const resizableRef = useRef();

  const initial = (e) => {
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
      ref={resizableRef}
      style={{ marginTop: `${height / 2}px` }}
      className={styles.draggable}
      draggable
      onDragStart={initial}
      onDrag={resize}
    >
      <DraggableImg />
    </div>
  );
};

export default Draggable;
