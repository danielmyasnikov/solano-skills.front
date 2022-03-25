import React from 'react';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import cn from 'classnames';
import InstructionSvg from '@assets/Instruction';
import { ExperienceTag } from '@components/exercise/common/ExperienceTag';
import { BulletPoint } from '@components/exercise/common/BulletPoint';

const Root = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  user-select: none;
  cursor: pointer;

  column-gap: 14px;

  background: var(--purple);

  min-height: 44px;
  padding: 0 20px;
`;

const Info = styled(Box)`
  display: flex;
  align-items: center;

  height: 100%;
  width: 100%;

  column-gap: 10px;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Points = styled(Box)`
  display: flex;
  align-items: center;
  height: 100%;
  width: auto;
  z-index: 0;
`;

const InstructionHeader = ({ onClick, xp, point, total, nestedExercise, doneExercisesIds }) => (
  <Root>
    <Info onClick={onClick}>
      <IconWrapper>
        <InstructionSvg />
      </IconWrapper>
      <Title>
        <span>
          Инструкции {point}/{total}
        </span>
        <ExperienceTag xp={xp} floatRight />
      </Title>
    </Info>
    <Points>
      {nestedExercise?.map((item, i) => {
        const isActiveBullet = point === i + 1;
        const isDoneBullet = doneExercisesIds?.find((id) => id === i + 1) !== undefined;

        return <BulletPoint key={i} index={i} isActive={isActiveBullet} isDone={isDoneBullet} />;
      })}
    </Points>
  </Root>
);

export default InstructionHeader;
