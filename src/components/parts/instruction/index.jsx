import React from 'react';
import styles from './styles.module.less';
import RadioButton from '@components/mui/radioButton';

export const InstructionQuizPart = ({ exercise, handleAnswer, answer }) => {
  if (!exercise) {
    return null;
  }

  return (
    <div className={styles.quiz}>
      {exercise.answers.map((item) => (
        <RadioButton
          key={item.value}
          checked={answer?.value === item.value}
          className={styles.quizItem}
          onChange={() => handleAnswer(item)}
          value={item.value}
        />
      ))}
    </div>
  );
};
