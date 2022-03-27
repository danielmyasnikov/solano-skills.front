import { useDispatch, useSelector } from 'react-redux';

import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import { exercisesSlice } from '@src/features/exercises/store/slices/exercises.slice';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import InstructionSvg from '@assets/Instruction';
import {
  selectExerciseContext,
  selectRootExercise,
  selectRootExerciseType,
  selectSteps,
} from '@src/features/exercises/store/selectors';
import { BulletPoint } from '@src/features/exercises/views/Simple/Sidebar/Instruction/BulletPoint';

const Root = styled(Box)`
  display: flex;
  align-items: center;

  flex-wrap: wrap;
  row-gap: 12px;
  padding: 7px 20px;
  justify-content: space-between;

  user-select: none;
  cursor: pointer;

  column-gap: 14px;

  background: var(--purple);

  min-height: 44px;
`;

const Info = styled(Box)`
  display: flex;
  align-items: center;

  width: fit-content;

  height: 100%;

  column-gap: 10px;

  &.fullWidth {
    width: 100%;
  }
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
`;

const Title = styled('span')`
  font-family: 'Jost', sans-serif;
  font-weight: bold;
  font-size: 16px;
  line-height: 127%;
  color: var(--color-white);
  text-align: center;
  white-space: nowrap;
  justify-content: space-between;
  align-items: center;

  gap: 20px;

  display: inline-flex;
  width: fit-content;

  &.fullWidth {
    width: 100%;
  }
`;

const ExperienceTag = styled('span')`
  background: var(--very-light-yellow);
  color: var(--color-black);
  border-radius: 4px;
  padding: 3px 6px;
  text-transform: uppercase;
  text-align: center;

  &.left {
    margin-right: auto;
  }
`;

const Points = styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  width: auto;
  z-index: 0;
`;

export default function InstructionHeader() {
  const dispatch = useDispatch();
  const type = useSelector(selectRootExerciseType);

  const { xp } = useSelector(selectExerciseContext);
  const { nested_exercises } = useSelector(selectRootExercise);
  const { active, total, totalDone } = useSelector(selectSteps);

  const toggleInstructionHeader = () =>
    dispatch(exercisesSlice.actions.toggleInstructionHeader({}));

  async function setStep(step) {
    if (step !== active) {
      await dispatch(exerciseSlice.actions.put(nested_exercises[step - 1]));
      await dispatch(exercisesSlice.actions.setStep(step));
    }
  }

  const isSteps = type === 'bullet_point_exercise';

  return (
    <Root>
      <Info onClick={toggleInstructionHeader} className={isSteps ? '' : 'fullWidth'}>
        <IconWrapper>
          <InstructionSvg />
        </IconWrapper>
        <Title className={isSteps ? '' : 'fullWidth'}>
          <span>
            Инструкции
            {isSteps && ` ${active}/${total}`}
          </span>
          <ExperienceTag className={isSteps ? 'left' : ''}>{xp} xp</ExperienceTag>
        </Title>
      </Info>
      {isSteps && (
        <Points>
          {[...Array(total).keys()]?.map((i) => (
            <BulletPoint
              key={i}
              index={i}
              isActive={active === i + 1}
              isCan={i + 1 <= totalDone + 1}
              isDone={i + 1 <= totalDone}
              onClick={() => setStep(i + 1)}
            />
          ))}
        </Points>
      )}
    </Root>
  );
}
