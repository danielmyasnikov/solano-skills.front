import { useHistory, useParams } from 'react-router';
import { Auth } from './author';
import { CourseInfo } from './courseInfo';
import { CourseList } from './courseList';
import { CourseSidebar } from './courseSidebar';

import styles from './styles.module.less';
import { useGetCourseQuery } from '@src/features/courses/courses.api';
import { Skeleton } from '@mui/material';

export const CoursePage = () => {
  const { courseId } = useParams();

  const history = useHistory();

  const { data: course, isLoading, error } = useGetCourseQuery(courseId);

  const startLearningHandler = () => {
    history.push(`/courses/${course.slug}/exercises/${course.exercises[0].id}`);
  };

  return (
    <div className={styles.wrapper}>
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
          <CourseSidebar
            coauthors={course?.coauthors}
            datasets={course?.datasets}
            tracks={course?.career_tracks}
          />
        </div>
      </div>
    </div>
  );
};
