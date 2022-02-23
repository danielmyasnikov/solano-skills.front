import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import InstructionSvg from '@assets/Instruction.js';
import Done from '@assets/Done.js';
import cn from 'classnames';
import { InstructionQuizPart } from '@components/parts/instruction';
import styles from './styles.module.less';

const RenderInstructionPart = (exercise, handleAnswer, answer) => {
  if (exercise) {
    const { type } = exercise;
    switch (type) {
      case 'quiz':
        return (
          <InstructionQuizPart handleAnswer={handleAnswer} answer={answer} exercise={exercise} />
        );
      default:
        return null;
    }
  } else {
    return null;
  }
};

export const NormalInstruction = ({ exercise, children, xp, answer, handleAnswer }) => {
  const [isInstructionHidden, setIsInstructionHidden] = useState(false);

  const handleSize = () => {
    setIsInstructionHidden(!isInstructionHidden);
  };

  return (
    <>
      <div className={styles.header}>
        <div onClick={handleSize} className={styles.left__side} role="presentation">
          <InstructionSvg />
          <span className={styles.title}>Инструкции</span>
        </div>
        <div className={styles.right__side}>
          <div className={styles.experience}>{xp} xp</div>
        </div>
      </div>
      <RenderInstructionPart exercise={exercise} handleAnswer={handleAnswer} answer={answer} />
      {children}
    </>
  );
};

export const BulletInstruction = ({
  onSetActiveExercise,
  doneExercises,
  activeExercise,
  nestedExercise,
  children,
  xp,
}) => (
  <>
    <div className={styles.header}>
      <div className={styles.left__side}>
        <InstructionSvg />
        <span className={styles.title}>
          Инструкции {activeExercise + 1}/{nestedExercise.length}
        </span>
        <div className={styles.experience}>{xp} xp</div>
      </div>
      <div className={styles.right__side}>
        {nestedExercise &&
          nestedExercise.map((item, i) => (
            <div
              key={uuid()}
              role="presentation"
              className={cn(styles.bulletPoint, {
                [styles.activeBulletPoint]: activeExercise === i,
                [styles.doneBulletPoint]: doneExercises?.find(
                  (exercise) => exercise.activeExercise === i,
                ),
              })}
              onClick={() => {
                if (
                  doneExercises?.find((doneExercise) => doneExercise.activeExercise === i) ||
                  doneExercises?.find((doneExercise) => doneExercise.activeExercise === i - 1)
                ) {
                  onSetActiveExercise({ activeExercise: i });
                }
              }}
            >
              <span>
                {doneExercises?.find((doneExercise) => doneExercise.activeExercise === i) ? (
                  <Done />
                ) : (
                  i + 1
                )}
              </span>
            </div>
          ))}
      </div>
    </div>
    {children}
  </>
);
