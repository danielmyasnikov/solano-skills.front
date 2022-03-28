import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';

import { selectCourse } from '@store/course/selector';
import { getCourse } from '@store/course/actions';

import { Auth } from './author';
import { CourseInfo } from './courseInfo';
import { CourseList } from './courseList';
import { CourseSidebar } from './courseSidebar';

import styles from './styles.module.less';

export const CoursePage = () => {
  const [course, setCourse] = useState({});

  const { courseId } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const courseData = useSelector(selectCourse);

  const startLearningHandler = () => {
    history.push(`/courses/${courseData.slug}/exercises/${courseData.exercises[0].id}`);
  };

  useEffect(() => setCourse(courseData), [courseData]);

  useEffect(() => dispatch(getCourse(courseId)), []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>{course.title}</h1>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
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
            onStartLearning={startLearningHandler}
          />
        </div>
        <div className={styles.contentWrap}>
          <CourseList
            parts={course.parts || []}
            description={course.long_description}
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
