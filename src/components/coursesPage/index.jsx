import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
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
          Пришло время засучить рукава — мы лучше всего учимся на практике. Все наши курсы являются
          интерактивными, сочетающими короткие видеоролики с практическими упражнениями. Это подход
          к обучению Deepskills.
        </p>
      </div>
      <div className={styles.content}>
        {coursesList &&
          coursesList.map((item) => (
            <React.Fragment key={uuid()}>
              <Card info={item} />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
