import React from 'react';
import styles from './styles.module.less';
import { CourseContent } from '../../courseContent';
import { Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectRootExercise } from '@src/features/exercises/store/selectors';

const CourseContentModal = ({ onClose, isOpen, parts, slug }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <CourseContent onClose={onClose} parts={parts} slug={slug} />
        </div>
      </div>
    </Modal>
  );
};

export default CourseContentModal;
