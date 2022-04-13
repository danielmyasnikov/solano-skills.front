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
import { useGetCoursesQuery } from '@src/features/courses/courses.api.ts';
import { useLocation } from 'react-router-dom';
import { PaymentErrorModal } from '@src/features/payment/PaymentErrorModal';
import { Grid } from '@mui/material';
import { getProfile } from '@store/profile/actions';
import Helmet from 'react-helmet';

export const CoursesPage = () => {
  const dispatch = useDispatch();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();

  const { headers } = useSelector(AuthStore.Selectors.getAuth);
  const { data: courses, loading, error } = useGetCoursesQuery();
  const { progress } = useSelector(ProgressStore.Selectors.getProgress);
  const isAuth = useSelector(selectIsAuth);

  const paymentStatus = query.get('paymentStatus');

  useEffect(() => {
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
    const accessToken = localStorage.getItem('access-token');

    dispatch(
      getProfile({
        headers: {
          uid,
          client,
          'access-token': accessToken,
        },
      }),
    );
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(ProgressStore.Actions.getProgress({ headers }));
    }
  }, [isAuth, headers]);

  return (
    <div className={styles.wrapper}>
      <Helmet title="Курсы" />
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
        <Grid spacing={3} container className={styles.content}>
          {courses?.map((item, i) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={i}>
              <CourseCard info={item} />
            </Grid>
          ))}
        </Grid>
      </div>

      {paymentStatus === 'fail' && <PaymentErrorModal />}
    </div>
  );
};
