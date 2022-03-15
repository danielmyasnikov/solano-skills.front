import React from 'react';
import { WrapHeader } from '../common/wrapHeader';
import { CourseList } from '../coursePage/courseList';
import { CourseSidebar } from '../coursePage/courseSidebar';
import styles from './styles.module.less';
import { course } from './data';

export const SkillPage = () => {
  return (
    <div className={styles.wrapper}>
      <WrapHeader variant={'skill'} />
      <div className={styles.contentWrap}>
        <CourseList variant={'skill'} parts={course.parts || []} />
        <CourseSidebar variant={'skill'} progress={course.progress} mentors={course.mentors} />
      </div>
    </div>
  );
};
