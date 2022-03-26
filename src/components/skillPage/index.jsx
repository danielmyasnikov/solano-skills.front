import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as AuthStore from '@store/auth';
import { getSkill } from '@store/api/skills';
import { useParams } from 'react-router';
import { WrapHeader } from '../common/wrapHeader';
import { CourseList } from '../coursePage/courseList';
import { CourseSidebar } from '../coursePage/courseSidebar';
import styles from './styles.module.less';
import { course } from './data';

export const SkillPage = () => {
  const [skill, setSkill] = useState({});
  const { skillId } = useParams();
  const { headers } = useSelector(AuthStore.Selectors.getAuth);

  const asyncGetSkill = async () => {
    const data = await getSkill(skillId, headers);
    setSkill(data);
  };

  useEffect(() => {
    asyncGetSkill();
    console.log(skill);
  }, []);

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
