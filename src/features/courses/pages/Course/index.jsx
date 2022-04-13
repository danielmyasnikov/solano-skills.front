import { useHistory, useParams } from 'react-router';
import { Auth } from './author';
import { CourseInfo } from './courseInfo';
import { CourseList } from './courseList';
import { CourseSidebar } from './courseSidebar';

import styles from './styles.module.less';
import { useGetCourseQuery, useRefetchCoursesMutation } from '@src/features/courses/courses.api.ts';
import { Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { getProfile } from '@store/profile/actions';
import { useDispatch } from 'react-redux';
import Helmet from 'react-helmet';

export const CoursePage = () => {
  const { courseId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const [updateCourses] = useRefetchCoursesMutation();
  const { data: course, isLoading } = useGetCourseQuery(courseId);

  const startLearningHandler = () => {
    history.push(`/courses/${course.slug}/exercises/${course.exercises[0].id}`);
  };

  useEffect(() => {
    updateCourses();
    dispatch(getProfile());
  }, []);

  return (
    <div className={styles.wrapper}>
      <Helmet title={course ? course.title : 'Курс'} />
      <div className={styles.header}>
        <h1 className={styles.title}>
          {course ? course.title : <Skeleton variant="text" width="40%" />}
        </h1>
        {course ? (
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
        ) : (
          <p className={styles.description}>
            <Skeleton variant="text" width="60%" />
          </p>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.headerInfo}>
          <div className={styles.authWrap}>
            <Auth instructor={course?.instructor} />
          </div>
          <CourseInfo
            id={course?.course_id}
            hours={course?.time}
            videos={course?.count_videos}
            exercises={course?.count_exercises}
            xps={course?.count_xps}
            status={course?.status}
            onStartLearning={isLoading ? undefined : startLearningHandler}
          />
        </div>
        <div className={styles.contentWrap}>
          <CourseList
            parts={course?.parts || []}
            description={course?.long_description}
            slug={course?.slug}
          />
          <CourseSidebar coauthors={course?.coauthors} datasets={course?.datasets} />
        </div>
      </div>
    </div>
  );
};
