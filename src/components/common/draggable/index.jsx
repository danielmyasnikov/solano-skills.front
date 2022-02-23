import DraggableImg from '@assets/Draggable';
import { useRef, useState } from 'react';
import styles from './styles.module.less';

const Draggable = ({ parentContainer, resizeContainer, height }) => {
  const [initialPos, setInitialPos] = useState();
  const [initialSize, setInitialSize] = useState();
  const resizableRef = useRef();

  const initial = (e) => {
    setInitialPos(e.clientX);
    setInitialSize(parentContainer.current.offsetWidth);
  };

  const resize = (e) => {
    // eslint-disable-next-line no-param-reassign
    resizeContainer.current.style.width = `${
      parseInt(initialSize, 10) + parseInt(e.clientX - initialPos, 10)
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
