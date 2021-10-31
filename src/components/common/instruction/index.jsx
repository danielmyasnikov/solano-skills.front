import React, { useState } from 'react';
import styles from './styles.module.less';
import InstructionSvg from 'assets/Instruction.svg';
import { useSelector } from 'react-redux';
import { selectExercise } from '../../../store/exercise/selector';
const Instructions = ({ children }) => {
  const exercise = useSelector(selectExercise);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left__side}>
          <InstructionSvg />
          <span className={styles.title}>Инструкции</span>
        </div>
        <div className={styles.right__side}>
          <div className={styles.experience}>{exercise.xp} xp</div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Instructions;
