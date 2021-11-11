import React from 'react';
import Button from '@components/mui/button';
import styles from './styles.module.less';

export const CourseInfo = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <span className={styles.title}>4</span>
          <span className={styles.description}>часа</span>
        </div>

        <div className={styles.block}>
          <span className={styles.title}>3</span>
          <span className={styles.description}>видео</span>
        </div>

        <div className={styles.block}>
          <span className={styles.title}>52</span>
          <span className={styles.description}>упражнения</span>
        </div>

        <div className={styles.block}>
          <span className={styles.title}>4 200</span>
          <span className={styles.description}>опыта</span>
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <Button variant="containedPurple" className={styles.btn}>
          Практиковаться
        </Button>
        <Button variant="outlinePurple">Пройти курс снова</Button>
      </div>
    </div>
  );
};
