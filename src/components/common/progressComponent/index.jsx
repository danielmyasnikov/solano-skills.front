import Button from '@components/mui/button';
import ProgressBar from '@components/mui/progressBar';

import { numberDeclension } from '../helpers/ numberDeclension';

import Clock from './assets/clock.svg';
import ArrowRight from './assets/arrowRight.svg';

import styles from './styles.module.less';

export const ProgressComponent = ({
  status,
  courseTitle,
  courseLogo,
  amountOfExercise,
  progress,
}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.containerLeft}>
            <img className={styles.containerLeftLogo} src={courseLogo} alt="courseLogo" />
            <div className={styles.containerLeftInfo}>
              <span className={styles.containerLeftInfoStatus}>{status}</span>
              <div className={styles.containerLeftInfoTitleContainer}>
                <span className={styles.containerLeftInfoTitle}>{courseTitle}</span>
                <img className={styles.containerLeftInfoArrow} src={ArrowRight} alt="arrow" />
              </div>
              <div className={styles.containerLeftProgress}>
                <div className={styles.containerLeftProgressBar}>
                  <ProgressBar
                    value={progress}
                    height={'12px'}
                    variant={'progress'}
                    isShowValue={false}
                  />
                </div>
                <div className={styles.containerLeftExercise}>
                  <img className={styles.containerLeftExerciseClock} src={Clock} alt="clock" />
                  <span className={styles.containerLeftExerciseText}>
                    Осталось
                    {` ${amountOfExercise} ${numberDeclension(amountOfExercise, [
                      'упражнение',
                      'упражнения',
                      'упражнений',
                    ])}`}
                  </span>
                </div>
              </div>
              <span className={styles.containerLeftInfoProgressText}>{Math.ceil(progress)}%</span>
            </div>
          </div>
          <div className={styles.btn}>
            <Button variant="containedPurple">Продолжить</Button>
          </div>
        </div>
      </div>
    </>
  );
};
