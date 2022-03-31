import { useDispatch, useSelector } from 'react-redux';

import {
  selectExerciseContext,
  selectHint,
  selectHintFeedback,
} from '@src/features/exercises/store/selectors';

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

import { exercisesSlice } from '@src/features/exercises/store/slices/exercises.slice';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';

const Root = styled(Box)`
  margin-top: 15px;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.04);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
  background: #fff;
  width: 100%;
  gap: 10px;

  & > div {
    display: flex;
    gap: 10px;
  }

  button {
    padding: 4px 20px;
    border: 2px solid;
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

export default function HintFeedback() {
  const dispatch = useDispatch();

  const { used: hintUsed } = useSelector(selectHint);
  const { completed } = useSelector(selectExerciseContext);

  const hintFeedbackUsed = useSelector(selectHintFeedback);

  if (completed || !hintUsed || hintFeedbackUsed) {
    return null;
  }

  return (
    <Root>
      <p>Вам помогла эта подсказка?</p>
      <div>
        <Button
          variant="outlineRed"
          onClick={() => {
            dispatch(exercisesSlice.actions.openFeedbackModal({}));
            dispatch(exerciseSlice.actions.useHintFeedback({}));
          }}
        >
          Нет
        </Button>
        <Button
          variant="outlinePurple"
          onClick={() => dispatch(exerciseSlice.actions.useHintFeedback({}))}
        >
          Да
        </Button>
      </div>
    </Root>
  );
}
