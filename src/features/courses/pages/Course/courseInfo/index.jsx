import { numberDeclension } from '@components/common/helpers/numberDeclension';

import styles from './styles.module.less';
import { Button, Skeleton } from '@mui/material';
import { openResetProgresseModal } from '@store/global/modals';
import { useDispatch } from 'react-redux';

export const CourseInfo = ({ id, hours, videos, exercises, xps, onStartLearning, status }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <span className={styles.title}>{hours || <Skeleton width="16px" height="100%" />}</span>
          <span className={styles.description}>
            {numberDeclension(hours, ['час', 'часа', 'часов'])}
          </span>
        </div>

        <div className={styles.block}>
          <span className={styles.title}>{videos || <Skeleton width="16px" height="100%" />}</span>
          <span className={styles.description}>видео</span>
        </div>

        <div className={styles.block}>
          <span className={styles.title}>
            {exercises || <Skeleton width="16px" height="100%" />}
          </span>
          <span className={styles.description}>
            {numberDeclension(exercises, ['упражнение', 'упражнения', 'упражнений'])}
          </span>
        </div>

        <div className={styles.block}>
          <span className={styles.title}>{xps || <Skeleton width="16px" height="100%" />}</span>
          <span className={styles.description}>опыта</span>
        </div>
      </div>

      <div className={styles.btnWrapper}>
        <Button
          variant="containedPurple"
          className={styles.btn}
          onClick={() => onStartLearning?.()}
        >
          Начать обучение
        </Button>
        {status === 'in_progress' && (
          <Button variant="outlinePurple" onClick={() => dispatch(openResetProgresseModal(id))}>
            Сбросить прогресс
          </Button>
        )}
      </div>
    </div>
  );
};
