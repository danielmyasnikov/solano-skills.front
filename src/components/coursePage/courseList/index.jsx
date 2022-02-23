/* eslint-disable react/no-danger */
import React from 'react';
import { CourseContent } from '@components/common/courseContent';
import styles from './styles.module.less';

export const CourseList = ({ parts, description, slug }) => (
  <div className={styles.wrapper}>
    <div className={styles.descriptionBlock}>
      <span className={styles.descriptionTitle}>Описание курса</span>
      <span className={styles.descriptionText} dangerouslySetInnerHTML={{ __html: description }} />
    </div>
    <CourseContent parts={parts} slug={slug} />
  </div>
);
