import React from 'react';
import RadioButton from '@components/mui/radioButton';
import styles from './styles.module.less';

export const InstructionQuizPart = ({ exercise, handleAnswer, answer }) => {
  if (!exercise) {
    return undefined;
  }

  return (
    <div className={styles.quiz}>
      {exercise.instruction}
      {exercise.answers.map((item) => (
        <React.Fragment key={item.value}>
          <RadioButton
            checked={answer?.value === item.value}
            className={styles.quizItem}
            onChange={() => handleAnswer(item)}
            value={item.value}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
