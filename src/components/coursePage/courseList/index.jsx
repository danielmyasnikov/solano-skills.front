import React from 'react';
import styles from './styles.module.less';
import { CourseContent } from '@components/common/courseContent';

export const CourseList = ({ parts, description, slug }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.descriptionBlock}>
        <span className={styles.descriptionTitle}>Описание курса</span>
        <span className={styles.descriptionText}>{description}</span>
      </div>
      <CourseContent parts={parts} slug={slug} />
    </div>
  );
};
