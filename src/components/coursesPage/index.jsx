import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as CoursesStore from '@store/courses';
import * as ProgressStore from '@store/progress';
import * as AuthStore from '@store/auth';
import { getProfile } from '@store/profile/actions';

import { Card } from './card';
import { ProgressComponent } from '../common/progressComponent';

import CourseLogo from './assets/CourseLogo.svg';

import styles from './styles.module.less';

export const CoursesPage = () => {
  const dispatch = useDispatch();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const { coursesList } = useSelector(CoursesStore.Selectors.getCourses);
  const { progress } = useSelector(ProgressStore.Selectors.getProgress);

  useEffect(() => {
    if (headers.uid) {
      dispatch(getProfile({ headers }));
      dispatch(ProgressStore.Actions.getProgress({ headers }));
    }
  }, [headers]);

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
      <div div className={styles.contentWrapper}>
        {progress && (
          <ProgressComponent
            status={progress.status}
            courseTitle={progress.name}
            courseLogo={CourseLogo}
            amountOfExercise={progress.left_to_do}
            progress={progress.progress}
          />
        )}
        <div className={styles.content}>
          {coursesList &&
            coursesList.map((item, i) => (
              <React.Fragment key={i}>
                <Card info={item} />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};
