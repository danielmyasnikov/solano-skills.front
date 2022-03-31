import { useSelector } from 'react-redux';

import { selectProfile } from '@store/profile/selector';

import CourseLogo from './assets/CourseLogo.svg';

import styles from './styles.module.less';
import { CourseProgress } from '@components/common/CourseProgress';

export const ProgressPage = () => {
  const profile = useSelector(selectProfile);

  return (
    <div className={styles.wrapper}>
      <CourseProgress
        userName={profile.name}
        status="В процессе"
        courseTitle="Введение в Python"
        courseLogo={CourseLogo}
        amountOfExercise="9"
        progress={20}
      />
    </div>
  );
};
