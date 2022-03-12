import React from 'react';
import Button from '@components/mui/button';
import styles from './styles.module.less';
import { numberDeclension } from '../../common/helpers/ numberDeclension';

export const CourseInfo = ({ hours, videos, exercises, xps }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <span className={styles.title}>{hours}</span>
          <span className={styles.description}>
            {numberDeclension(hours, ['час', 'часа', 'часов'])}
          </span>
        </div>

        <div className={styles.block}>
          <span className={styles.title}>{videos}</span>
          <span className={styles.description}>видео</span>
        </div>

        <div className={styles.block}>
          <span className={styles.title}>{exercises}</span>
          <span className={styles.description}>
            {numberDeclension(exercises, ['упражнение', 'упражнения', 'упражнений'])}
          </span>
        </div>

        <div className={styles.block}>
          <span className={styles.title}>{xps}</span>
          <span className={styles.description}>опыта</span>
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <Button variant="containedPurple" className={styles.btn}>
          Начать обучение
        </Button>
        <Button variant="outlinePurple">Пройти курс снова</Button>
      </div>
    </div>
  );
};
