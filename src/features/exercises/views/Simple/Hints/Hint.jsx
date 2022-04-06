import { useDispatch, useSelector } from 'react-redux';

import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';

import {
  selectExerciseContext,
  selectExerciseType,
  selectHint,
} from '@src/features/exercises/store/selectors';

import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

const HintButton = styled(Button)`
  display: flex;
  margin-top: 30px;
  margin-left: auto;

  @media screen and (max-width: 640px) {
    margin-right: auto;
  }
`;
const Root = styled(Box)`
  margin: 0 20px;

  h6 {
    font-size: 16px;
    margin-bottom: 15px;
    margin-top: 20px;
  }

  ul {
    padding-left: 20px;
    li {
      margin: 20px 0;
    }
  }

  code {
    background: #2c2a3f;
    color: #fff;
  }
`;

export default function Hint() {
  const dispatch = useDispatch();

  const { completed } = useSelector(selectExerciseContext);
  const type = useSelector(selectExerciseType);

  const { used: hintUsed, content: hintContent, value: hintValue } = useSelector(selectHint);

  if (!completed && hintUsed) {
    return (
      <Root>
        <h6>Подсказка</h6>
        <p dangerouslySetInnerHTML={{ __html: hintContent }} />
      </Root>
    );
  }

  if (!completed && !!hintContent && type !== 'quiz' && type !== 'quiz_with_script') {
    return (
      <HintButton
        variant="outlinePurple"
        onClick={() => dispatch(exerciseSlice.actions.useHint({}))}
      >
        Подсказка (-{hintValue} XP)
      </HintButton>
    );
  }

  return null;
}
