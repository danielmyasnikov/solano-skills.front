import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as CoursesStore from '@store/courses';
import { Card } from './card';

import styles from './styles.module.less';

export const CoursesPage = () => {
  const dispatch = useDispatch();

  const { coursesList } = useSelector(CoursesStore.Selectors.getCourses);

  useEffect(() => {
    dispatch(CoursesStore.Actions.loadCourcesList());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Курсы</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={styles.content}>
        {coursesList &&
          coursesList.map((item, i) => (
            <React.Fragment key={i}>
              <Card info={item} />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
