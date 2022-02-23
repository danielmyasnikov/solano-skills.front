import React, { useEffect, useState } from 'react';
import styles from './styles.module.less';
import InstructionSvg from '@assets/Instruction.js';
import Done from '@assets/Done.js';
import cn from 'classnames';
import { InstructionQuizPart } from '@components/parts/instruction';

export const NormalInstruction = ({ exercise, children, xp, answer, handleAnswer }) => {
  const [isInstructionHidden, setIsInstructionHidden] = useState(false);

  const handleSize = () => {
    setIsInstructionHidden(!isInstructionHidden);
  };

  const RenderInstructionPart = () => {
    if (exercise) {
      switch (exercise.type) {
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

  return (
    <>
      <div className={styles.header}>
        <div onClick={handleSize} className={styles.left__side}>
          <InstructionSvg />
          <span className={styles.title}>Инструкции</span>
        </div>
        <div className={styles.right__side}>
          <div className={styles.experience}>{xp} xp</div>
        </div>
      </div>
      <RenderInstructionPart />
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
}) => {
  return (
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
                key={i}
                className={cn(styles.bulletPoint, {
                  [styles.activeBulletPoint]: activeExercise === i,
                  [styles.doneBulletPoint]: doneExercises?.find(
                    (item) => item.activeExercise === i,
                  ),
                })}
                onClick={() => {
                  if (
                    doneExercises?.find((item) => item.activeExercise === i) ||
                    doneExercises?.find((item) => item.activeExercise === i - 1)
                  ) {
                    onSetActiveExercise({ activeExercise: i });
                  }
                }}
              >
                <span>
                  {doneExercises?.find((item) => item.activeExercise === i) ? <Done /> : i + 1}
                </span>
              </div>
            ))}
        </div>
      </div>
      {children}
    </>
  );
};
