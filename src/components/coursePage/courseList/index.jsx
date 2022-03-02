import React from 'react';
import styles from './styles.module.less';
import { CourseContent } from '@components/common/courseContent';

export const CourseList = ({ parts, description, slug, variant }) => {
  console.log(variant);

  return (
    <>
      {variant === 'skill' ? (
        <div className={styles.skillWrapper}>
          <CourseContent variant={variant} parts={parts} />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.descriptionBlock}>
            <span className={styles.descriptionTitle}>Описание курса</span>
            <span
              className={styles.descriptionText}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <CourseContent parts={parts} slug={slug} />
        </div>
      )}
    </>
  );
};
