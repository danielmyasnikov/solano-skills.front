import styles from './styles.module.less';
import cn from 'classnames';
import GraphArrow from '@assets/GraphArrow';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTerminal } from '../../store/selectors/terminal.selector';

export const Plot = ({ hide }) => {
  const terminal = useSelector(selectTerminal);

  const [activeBytePayload, setActiveBytePayload] = useState(0);

  useEffect(() => {
    setActiveBytePayload(terminal.bytePayload.length - 1);
  }, [terminal.bytePayload]);

  const handleActiveBytePayload = (action) => {
    if (action === 'add' && activeBytePayload < terminal.bytePayload.length - 1) {
      setActiveBytePayload(activeBytePayload + 1);
    }
    if (action === 'sub' && activeBytePayload > 0) {
      setActiveBytePayload(activeBytePayload - 1);
    }
  };

  return (
    <div className={cn(styles.bytePayload, { [styles.hide]: hide })}>
      <div className={styles.graph}>
        <img src={terminal.bytePayload[activeBytePayload]} alt="Иконка" />
      </div>
      <div className={styles.btnWrap}>
        <button
          className={cn({ [styles.disable]: activeBytePayload === 0 })}
          onClick={() => handleActiveBytePayload('sub')}
          disabled={activeBytePayload === 0}
        >
          <GraphArrow />
          Назад
        </button>
        <div className={styles.count}>
          {activeBytePayload + 1}
          <span>/{terminal.bytePayload.length}</span>
        </div>
        <button
          className={cn({
            [styles.disable]: activeBytePayload === terminal.bytePayload.length - 1,
          })}
          onClick={() => handleActiveBytePayload('add')}
          disabled={activeBytePayload === terminal.bytePayload.length - 1}
        >
          Вперед
          <GraphArrow />
        </button>
      </div>
    </div>
  );
};
