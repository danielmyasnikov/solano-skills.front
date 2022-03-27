import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as CoursesStore from '@store/courses';
import * as ProgressStore from '@store/progress';
import * as AuthStore from '@store/auth';

import { Card } from './card';
import { ProgressComponent } from '../common/progressComponent';
import { Preloader } from '../mui/preloader';

import CourseLogo from './assets/CourseLogo.svg';

import styles from './styles.module.less';
import { selectIsAuth } from '@store/profile/selector';

export const CoursesPage = () => {
  const dispatch = useDispatch();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  const { coursesList } = useSelector(CoursesStore.Selectors.getCourses);
  const { progress } = useSelector(ProgressStore.Selectors.getProgress);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(ProgressStore.Actions.getProgress({ headers }));
    }
  }, [isAuth]);

  useEffect(() => dispatch(CoursesStore.Actions.loadCourcesList()), []);

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
      <div className={styles.contentWrapper}>
        {(progress.hasOwnProperty('status') && isAuth && (
          <ProgressComponent
            status={progress.status}
            courseId={progress.course_id}
            exerciseId={progress.exercise_id}
            courseTitle={progress.name}
            courseLogo={CourseLogo}
            amountOfExercise={progress.left_to_do}
            progress={progress.progress}
          />
        )) ||
          (isAuth && !progress.hello_world && (
            <div className={styles.preloaderContainer}>
              <Preloader size="60px" />
            </div>
          ))}
        <div className={styles.content}>
          {coursesList?.map((item, i) => (
            <Card key={i} info={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
