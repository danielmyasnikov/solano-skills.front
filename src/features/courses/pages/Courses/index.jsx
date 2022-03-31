import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as ProgressStore from '@store/progress';
import * as AuthStore from '@store/auth';

import { CourseCard } from './CourseCard';
import { Preloader } from '@components/mui/Preloader';
import { CourseProgress } from '@components/common/CourseProgress';

import CourseLogo from './assets/CourseLogo.svg';

import styles from './styles.module.less';
import { selectIsAuth } from '@store/profile/selector';
import { useGetCoursesQuery } from '@src/features/courses/courses.api';

export const CoursesPage = () => {
  const dispatch = useDispatch();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  const { data: courses, loading, error } = useGetCoursesQuery();
  const { progress } = useSelector(ProgressStore.Selectors.getProgress);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(ProgressStore.Actions.getProgress({ headers }));
    }
  }, [isAuth, headers]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Курсы</h1>
        <p className={styles.description}>
          Пришло время засучить рукава — мы лучше всего учимся на практике. Все наши курсы являются
          интерактивными, сочетающими короткие видеоролики с практическими упражнениями. Это подход
          к обучению DeepSkills.
        </p>
      </div>
      <div className={styles.contentWrapper}>
        {Object.keys(progress).length > 0 && isAuth && (
          <>
            {progress.hasOwnProperty('status') ? (
              <CourseProgress
                status={progress.status}
                courseId={progress.course_id}
                exerciseId={progress.exercise_id}
                courseTitle={progress.name}
                courseLogo={CourseLogo}
                amountOfExercise={progress.left_to_do}
                progress={progress.progress}
              />
            ) : (
              !progress.hello_world && (
                <div className={styles.preloaderContainer}>
                  <Preloader size="60px" />
                </div>
              )
            )}
          </>
        )}
        <div className={styles.content}>
          {courses?.map((item, i) => (
            <CourseCard key={i} info={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
