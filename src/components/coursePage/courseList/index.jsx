import React from 'react';
import styles from './styles.module.less';
import { temp } from '../../common/courseContent/temp';
import { CourseContent } from '@components/common/courseContent';

export const CourseList = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.descriptionBlock}>
        <span className={styles.descriptionTitle}>Описание курса</span>
        <span className={styles.descriptionText}>{temp.description}</span>
      </div>
      <CourseContent />
    </div>
  );
};
