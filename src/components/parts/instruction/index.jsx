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
