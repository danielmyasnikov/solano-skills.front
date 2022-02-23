import React from 'react';
import styles from './styles.module.less';
import Terminal from '@assets/terminal.png';
import SideBarArrowLeft from '@assets/SideBarArrowLeft.js';

export const Exercise = ({ exercise }) => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left__side}>
          <img className={styles.icon} src={Terminal} alt="Logo" />
          <span className={styles.title}>Упражнение</span>
        </div>
        <div className={styles.right__side}>
          <SideBarArrowLeft />
        </div>
      </div>
      <div className={styles.exercise}>
        <h1 dangerouslySetInnerHTML={{ __html: exercise.title || 'Заголовок не задан' }} />
        <div dangerouslySetInnerHTML={{ __html: exercise.description }} />
      </div>
    </>
  );
};
