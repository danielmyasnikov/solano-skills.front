import React from 'react';
import Button from '@components/mui/button';
import Complete from '@assets/Complete.js';
import Close from '@assets/Close.png';
import Rating from '@components/mui/rating';
import styles from './styles.module.less';

const CompletedTask = ({ onClick, onClose, correctMessage }) => (
  <div className={styles.modal}>
    <div className={styles.content}>
      <img
        src={Close}
        className={styles.closeModal}
        onClick={onClose}
        alt="close"
        role="presentation"
      />
      <Complete />
      <span className={styles.xp}>+10 XP</span>
      <div className={styles.rating}>
        <Rating readonly value={5} />
      </div>
      <span className={styles.title}>{correctMessage || 'Отлично!\nВы выполнили задание!'}</span>
      <span className={styles.dis}>Нажмите кнопку ниже</span>
      <Button onClick={onClick} variant="containedWhite">
        Следующее упражнение
      </Button>
    </div>
  </div>
);

export default CompletedTask;
