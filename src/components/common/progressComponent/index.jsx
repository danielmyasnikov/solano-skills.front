import Button from '@components/mui/button';
import ProgressBar from '@components/mui/progressBar';

import Clock from './assets/clock.svg';
import ArrowRight from './assets/arrowRight.svg';

import styles from './styles.module.less';

export const ProgressComponent = ({
  userName,
  status,
  courseTitle,
  courseLogo,
  amountOfExercise,
  progress,
}) => {
  const declOfNum = (n, text_forms) => {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) {
      return `Осталось ${n} ${text_forms[2]}`;
    }
    if (n1 > 1 && n1 < 5) {
      return `Осталось ${n} ${text_forms[1]}`;
    }
    if (n1 === 1) {
      return `Осталось ${n} ${text_forms[0]}`;
    }
    return `Осталось ${n} ${text_forms[2]}`;
  };

  return (
    <>
      <span className={styles.header}>С возвращением, {userName}</span>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.containerLeft}>
            <img src={courseLogo} alt="courseLogo" />
            <div className={styles.containerLeftInfo}>
              <span className={styles.containerLeftInfoStatus}>{status}</span>
              <div>
                <span className={styles.containerLeftInfoTitle}>{courseTitle}</span>
                <img src={ArrowRight} alt="arrow" />
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
                  <img src={Clock} alt="clock" />
                  <span className={styles.containerLeftExerciseText}>
                    {declOfNum(amountOfExercise, ['упражнение', 'упражнения', 'упражнений'])}
                  </span>
                </div>
              </div>
              <span className={styles.containerLeftInfoProgressText}>{progress}%</span>
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
