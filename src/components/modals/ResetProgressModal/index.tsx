import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Close from '@assets/Close';

import { selectNewProgress } from '@src/features/courses/store/progress/selector';

import styles from './styles.module.less';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';
import { dropProgress } from '@src/features/courses/store/progress/actions';
import { getProfile } from '@store/profile/actions';
import { useRefetchCoursesMutation } from '@src/features/courses/courses.api';

export interface ResetProgressModalProps {
  onClose: () => void;
}

const ResetProgressModal = ({ onClose }: ResetProgressModalProps) => {
  const progress = useSelector(selectNewProgress);
  // @ts-ignore
  const courseId = useSelector(({ global }) => global.modals.courseId);
  const [updateCourses] = useRefetchCoursesMutation();

  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(dropProgress(courseId));

    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
    const accessToken = localStorage.getItem('access-token');

    dispatch(
      getProfile({
        headers: {
          uid,
          client,
          'access-token': accessToken,
        },
      }),
    );

    updateCourses();
    onClose();
  };

  useEffect(() => {
    if (progress.progressStatus === 'success') {
      history.push(`/courses/${courseId}`);
    }
  }, [progress]);

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <div className={styles.closeModal} onClick={onClose}>
          <Close />
        </div>
        <div className={styles.contentForm}>
          <h2>Сброс прогресса</h2>
          <span>Вы уверены, что хотите сбросить прогресс? Весь прогресс будет сброшен.</span>
          <div>
            {/* @ts-ignore */}
            <Button type="submit" className={styles.btn} variant="outlineRed" onClick={onClose}>
              Нет
            </Button>
            <Button
              type="submit"
              className={styles.btn}
              // @ts-ignore
              variant="outlinePurple"
              onClick={handleSubmit}
            >
              Да
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetProgressModal;
