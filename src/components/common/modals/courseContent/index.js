import React from 'react';
import styles from './styles.module.less';
import { CourseContent } from '../../courseContent';
import { Modal } from '@mui/material';

const CourseContentModal = ({ onClose, isOpen }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <CourseContent onClose={onClose}/>
        </div>
      </div>
    </Modal>
  );
};

export default CourseContentModal;
