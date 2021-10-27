import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import styles from './styles.module.less';
import InstructionSvg from 'assets/Instruction.svg';
import { useSelector } from 'react-redux';
import { selectExercise } from '../../../store/exercise/selector';
import Button from '../button';

const Instructions = ({ onSubmit }) => {
  const [value, setValue] = useState();
  const [correct, setCorrect] = useState();
  const exercise = useSelector(selectExercise);
  const checkAnswer = () => {
    if(correct === true){
      onSubmit()
    }
  };
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
      {exercise.type === 'quiz' && (
        <div className={styles.quiz}>
          {exercise.answers.map((item) => (
            <RadioGroup key={item.value} className={styles.quizItem} row>
              <FormControlLabel
                className={styles.top}
                control={
                  <Radio
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: 21,
                      },
                      color: '#7469EF',
                      '&.Mui-checked': {
                        color: '#7469EF',
                      },
                      '&.MuiRadio-root': {
                        padding: '0 9px',
                      },
                      '&.MuiFormControlLabel-root': {
                        marginRight: '0',
                      },
                    }}
                    value={item.value}
                    checked={value === item.value}
                    onChange={(e) => {
                      setCorrect(item.correct)
                      setValue(e.currentTarget.value);
                    }}
                  />
                }
                label={item.value}
              />
            </RadioGroup>
          ))}
          <div className={styles.btnContainer}>
            <Button
              className={styles.btn}
              variant="fillPurple"
              onClick={() => {
                checkAnswer();
              }}
            >
              Ответить
            </Button>
          </div>
        </div>
      )}
      {exercise.type === 'normal_exercise' && (
        <div
          dangerouslySetInnerHTML={{ __html: exercise.instruction }}
          className={styles.instructions}
        />
      )}
    </>
  );
};

export default Instructions;
