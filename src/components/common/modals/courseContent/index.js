import React from 'react';
import { Modal } from '@mui/material';
import styles from './styles.module.less';
import { CourseContent } from '../../courseContent';

const CourseContentModal = ({ onClose, isOpen, parts, slug, coursePartSlug }) => (
  <Modal open={isOpen} onClose={onClose}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <CourseContent
          onClose={onClose}
          parts={parts}
          slug={slug}
          coursePartSlug={coursePartSlug}
        />
      </div>
    </div>
  </Modal>
);

export default CourseContentModal;
