import { useDispatch, useSelector } from 'react-redux';

import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice.ts';

import {
  selectExerciseContext,
  selectHint,
  selectSolutionHint,
} from '@src/features/exercises/store/selectors/exercise.selectors';
import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

const Root = styled(Box)`
  padding-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SolutionButton = styled(Button)`
  border: 2px solid;
`;

export default function SolutionHint() {
  const dispatch = useDispatch();

  const { used: hintUsed } = useSelector(selectHint);
  const { completed } = useSelector(selectExerciseContext);
  const {
    used: solutionUsed,
    content: solutionContent,
    value: solutionValue,
  } = useSelector(selectSolutionHint);

  if (completed || !hintUsed || !solutionContent || solutionUsed) {
    return null;
  }

  return (
    <Root>
      <SolutionButton
        variant="outlinePurple"
        onClick={() => dispatch(exerciseSlice.actions.useSolution({}))}
      >
        Показать ответ (-{solutionValue} XP)
      </SolutionButton>
    </Root>
  );
}
