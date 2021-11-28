import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import { selectCourse } from '@store/course/selector';
import { getCourse } from '@store/course/actions';
import { Auth } from './author';
import { CourseInfo } from './courseInfo';
import { CourseList } from './courseList';
import { CourseSidebar } from './courseSidebar';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

export const CoursePage = () => {
  const { courseId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const courseData = useSelector(selectCourse);
  const [course, setCourse] = useState({});
  useEffect(() => {
    setCourse(courseData);
  }, [courseData]);

  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.description}>{course.description}</p>
      </div>
      <div className={styles.content}>
        <div className={styles.headerInfo}>
          <div className={styles.authWrap}>
            <Auth instructor={course.instructor} />
          </div>
          <CourseInfo
            hours={course?.time}
            videos={course?.count_videos}
            exercises={course?.count_exercises}
            xps={course?.count_xps}
          />
        </div>
        <div className={styles.contentWrap}>
          <CourseList
            parts={course.parts || []}
            description={course.description}
            slug={course.slug}
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
