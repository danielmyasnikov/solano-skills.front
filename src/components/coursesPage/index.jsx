import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as CoursesStore from '@store/courses';
import { selectProfile } from '@store/profile/selector';
import * as AuthStore from '@store/auth';
import { getProfile } from '@store/profile/actions';
import { Card } from './card';
import CourseLogo from './assets/CourseLogo.svg';

import styles from './styles.module.less';
import { ProgressComponent } from '../common/progressComponent';

export const CoursesPage = () => {
  const dispatch = useDispatch();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  const profile = useSelector(selectProfile);

  const { coursesList } = useSelector(CoursesStore.Selectors.getCourses);

  useEffect(() => {
    if (headers.uid) {
      dispatch(getProfile({ headers: headers }));
    }
  }, [dispatch, headers]);

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
      <ProgressComponent
        status="В процессе"
        courseTitle="Введение в Python"
        courseLogo={CourseLogo}
        amountOfExercise="9"
        progress={20}
      />
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
