import React from 'react';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import InstructionSvg from '@assets/Instruction';
import { ExperienceTag } from '@components/exercise/common/ExperienceTag';

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

const InstructionHeader = ({ onClick, xp }) => (
  <Root>
    <Info onClick={onClick}>
      <IconWrapper>
        <InstructionSvg />
      </IconWrapper>
      <Title>
        <span>Инструкции</span>
        <ExperienceTag xp={xp} />
      </Title>
    </Info>
  </Root>
);

export default InstructionHeader;
