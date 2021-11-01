import React from 'react';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import Complete from '@assets/Complete.js';
import Close from '@assets/Close.js';
import Rating from '@components/mui/rating';

const CompletedTask = ({ onClick, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <Close className={styles.closeModal} onClick={onClose} />
        <Complete />
        <span className={styles.xp}>+10 XP</span>
        <div className={styles.rating}>
          <Rating readonly="true" value="5" />
        </div>
        <span className={styles.title}>
          Отлично!
          <br />
          Вы выполнили задание!
        </span>
        <span className={styles.dis}>Нажмите кнопку ниже</span>
        <Button onClick={onClick} variant="containedWhite">
          Следующее упражнение
        </Button>
      </div>
    </div>
  );
};

export default CompletedTask;
