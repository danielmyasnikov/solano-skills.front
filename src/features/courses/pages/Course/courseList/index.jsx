import React from 'react';
import styles from './styles.module.less';
import { CourseContent } from '@components/common/CourseContent';
import { Skeleton } from '@mui/material';

export const CourseList = ({ parts, description, slug, variant }) => {
  return (
    <>
      {variant === 'skill' || variant === 'profession' ? (
        <div className={styles.skillWrapper}>
          <CourseContent variant={variant} parts={parts} />
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.descriptionBlock}>
            <span className={styles.descriptionTitle}>Описание курса</span>
            {description ? (
              <span
                className={styles.descriptionText}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <span className={styles.descriptionText}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton width="40%" />
              </span>
            )}
          </div>
          <CourseContent parts={parts} slug={slug} />
        </div>
      )}
    </>
  );
};
