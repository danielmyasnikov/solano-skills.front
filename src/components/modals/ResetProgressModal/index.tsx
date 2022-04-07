import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Close from '@assets/Close';

import { selectNewProgress } from '../../../features/courses/store/progress/selector';

import styles from './styles.module.less';
import { Button } from '@mui/material';
import { useHistory, useParams } from 'react-router';
import { dropProgress } from '@src/features/courses/store/progress/actions';

export interface ResetProgresseModalProps {
  onClose: () => void;
}

const ResetProgresseModal = ({ onClose }: ResetProgresseModalProps) => {
  const { courseId } = useParams<{ courseId: string }>();

  const progress = useSelector(selectNewProgress);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newCourseId = courseId.replaceAll('-', '_');
    // @ts-ignore
    dispatch(dropProgress(newCourseId));
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
            <Button type="submit" className={styles.btn} variant="outlineRed" onClick={onClose}>
              Нет
            </Button>
            <Button
              type="submit"
              className={styles.btn}
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
export default ResetProgresseModal;
