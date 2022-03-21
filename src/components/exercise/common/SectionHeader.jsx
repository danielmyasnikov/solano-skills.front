import React from 'react';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const Root = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  column-gap: 14px;

  background: var(--purple);

  min-height: 44px;
  padding: 6px 20px;

  &.bordered {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
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

const Content = styled(Box)`
  display: flex;
  align-items: center;

  height: 100%;
  width: auto;

  &:empty {
    display: none;
  }
`;

const SectionHeader = ({ children, title, icon, bordered }) => (
  <Root className={bordered ? 'bordered' : ''}>
    <Info>
      <IconWrapper>{icon}</IconWrapper>
      <Title>{title}</Title>
    </Info>
    <Content>{children}</Content>
  </Root>
);

export default SectionHeader;
