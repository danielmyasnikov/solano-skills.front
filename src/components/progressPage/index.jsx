import { useSelector } from 'react-redux';
import { ProgressComponent } from '../common/progressComponent';

import { selectProfile } from '@store/profile/selector';

import CourseLogo from './assets/CourseLogo.svg';

import styles from './styles.module.less';

export const ProgressPage = () => {
  const profile = useSelector(selectProfile);

  return (
    <div className={styles.wrapper}>
      <ProgressComponent
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
