import React from 'react';
import styles from './styles.module.less';
import Terminal from '@assets/terminal.png';
import SideBarArrowLeft from '@assets/SideBarArrowLeft.js';
import { useSelector } from 'react-redux';
import { selectExercise } from '../../../store/exercise/selector';

const Exercise = () => {
  const exercise = useSelector(selectExercise);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left__side}>
        <img className ={styles.icon} src={Terminal} alt="Logo" />
          <span className={styles.title}>Упражнение</span>
        </div>
        <div className={styles.right__side}>
          <SideBarArrowLeft />
        </div>
      </div>
      <div className={styles.exercise}>
        <h1>Title</h1>
        <div dangerouslySetInnerHTML={{ __html: exercise.description }} />
      </div>
    </>
  );
};

export default Exercise;
