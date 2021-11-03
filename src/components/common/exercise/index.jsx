import React from 'react';
import styles from './styles.module.less';
import TerminalSvg from 'assets/Terminal.svg';
import SideBarArrowLeft from 'assets/SideBarArrowLeft.svg';
import { useSelector } from 'react-redux';
import { selectExercise } from '../../../store/exercise/selector';

const Exercise = () => {
  const exercise = useSelector(selectExercise);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left__side}>
          <TerminalSvg />
          <span className={styles.title}>Упражнение</span>
        </div>
        <div className={styles.right__side}>
          <SideBarArrowLeft />
        </div>
      </div>
      <div className={styles.exercise}>
        <h1 dangerouslySetInnerHTML={{__html: exercise.title || 'Заголовок не задан'}} />
        <div dangerouslySetInnerHTML={{ __html: exercise.description }}/>
      </div>
    </>
  );
};

export default Exercise;
