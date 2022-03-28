import { useDispatch, useSelector } from 'react-redux';

import {
  selectCurrentExercise,
  selectExerciseSidebar,
  selectExerciseType,
  selectHint,
  selectQuizVariants,
} from '@src/features/exercises/store/selectors';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Button from '@components/mui/button';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import React from 'react';
import RadioButton from '@components/mui/radioButton';
import { selectIsAuth } from '@store/profile/selector';
import { exercisesSlice } from '@src/features/exercises/store/slices/exercises.slice';

const Content = styled(Box)`
  margin-top: 35px;

  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 10px;

  word-break: break-word;

  &:empty {
    display: none;
  }

  p {
    margin: 20px 0;
  }

  ol {
    margin-left: 20px;
  }

  ul {
    margin-left: 20px;
    list-style-type: disc;
    li {
      margin: 20px 0;
    }
  }

  p,
  li,
  code {
    font-size: 16px;
  }
`;

const ButtonWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 15px;

  margin: 15px 20px 5px;
  padding-bottom: 15px;
`;

const Quiz = styled(Box)`
  margin-bottom: 20px;
  padding-left: 20px;
  padding-right: 10px;
  word-break: break-word;

  p {
    margin: 20px 0;
  }

  ol {
    margin-left: 20px;
  }

  ul {
    margin-left: 20px;
    list-style-type: disc;
    li {
      margin: 20px 0;
    }
  }

  p,
  li,
  code {
    font-size: 16px;
  }
`;

const QuizRadioButton = styled(RadioButton)`
  margin: 20px 0;

  cursor: pointer;

  &:first-child {
    margin-top: 0;
  }

  label {
    cursor: pointer;

    font-size: 16px;
    align-items: flex-start;
  }

  span {
    font-family: 'Nunito', sans-serif;
    font-size: 16px;
    line-height: normal;
    letter-spacing: normal;
  }
`;

export default function InstructionBody() {
  const dispatch = useDispatch();

  const type = useSelector(selectExerciseType);
  const { instruction } = useSelector(selectCurrentExercise);
  const { instructionFolded } = useSelector(selectExerciseSidebar);
  const quizVariants = useSelector(selectQuizVariants);
  const isAuth = useSelector(selectIsAuth);

  const { used: hintUsed, content: hintContent, value: hintValue } = useSelector(selectHint);

  if (instructionFolded) {
    return null;
  }

  function onAnswer() {
    if (isAuth) {
      dispatch(exerciseSlice.actions.onQuizAnswer({}));
    } else {
      dispatch(exercisesSlice.actions.openSignupModal({}));
    }
  }

  return (
    <>
      <Content dangerouslySetInnerHTML={{ __html: instruction }} />
      {type === 'quiz' && !instruction && <div style={{ height: '28px' }} />}

      {type === 'quiz' && (
        <Quiz>
          {quizVariants.map((variant) => (
            <QuizRadioButton
              key={variant.id}
              checked={variant.checked}
              onChange={() => dispatch(exerciseSlice.actions.onQuizSelect(variant.id))}
              value={variant.content}
            />
          ))}
        </Quiz>
      )}

      {type === 'quiz' && (
        <ButtonWrapper>
          {!hintUsed && !!hintContent && (
            <Button
              variant="outlinePurple"
              onClick={() => dispatch(exerciseSlice.actions.useHint({}))}
            >
              Подсказка (-{hintValue} XP)
            </Button>
          )}

          <Button variant="containedPurple" onClick={onAnswer}>
            Ответить
          </Button>
        </ButtonWrapper>
      )}
    </>
  );
}
