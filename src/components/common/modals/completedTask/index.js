import React from 'react';
import Button from '../../../mui/button';
import styles from './styles.module.less';
import Complete from 'assets/Complete.svg';
import Star from 'assets/Star.svg';
import Close from 'assets/Close.svg';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getExercise } from '../../../../store/exercise/actions';

const CompletedTask = ({ onClick }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <Close className={styles.closeModal} onClick={onClick} />
        <Complete />
        <span className={styles.xp}>+10 XP</span>
        <div className={styles.rating}>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        <span className={styles.title}>
          Отлично!
          <br />
          Вы выполнили задание!
        </span>
        <span className={styles.dis}>Нажмите кнопку ниже</span>
        <Button
          onClick={onClick}
          variant="fillWhite"
        >
          Следующее упражнение
        </Button>
      </div>
    </div>
  );
};

export default CompletedTask;
