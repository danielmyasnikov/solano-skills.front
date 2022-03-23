import React from 'react';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import TerminalImg from '@assets/terminal.png';

const Root = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 10;

  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  &.folded {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  position: absolute;
  top: 0;
  width: 100%;

  user-select: none;

  background: var(--purple);

  min-height: 44px;

  margin-bottom: 2px;
`;

const Info = styled(Box)`
  padding-left: 20px;

  display: flex;
  align-items: center;

  cursor: pointer;

  height: 100%;
  width: 100%;

  column-gap: 10px;
`;

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;
  margin-left: 8px;

  &.left {
    margin: 0;
  }

  &.open {
    margin-left: 10px;
  }

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

  padding-right: 7px;
`;

const Separator = styled(Box)`
  width: 2px;
  min-height: 44px;

  background-color: white;
`;

const Content = styled(Box)`
  display: flex;
  align-items: center;

  height: 100%;
  width: auto;

  cursor: pointer;

  &:empty {
    display: none;
  }
`;

const SidebarHeader = ({ open, toggleSidebar, onClick }) => (
  <Root className={open ? '' : 'folded'}>
    {open && (
      <Info onClick={onClick}>
        <IconWrapper className="left">
          <img width="24px" height="24px" src={TerminalImg} alt="Logo" />
        </IconWrapper>
        <Title>Упражнение</Title>
      </Info>
    )}
    <Content onClick={toggleSidebar} style={open ? {} : { transform: 'rotate(180deg)' }}>
      {open && <Separator />}
      <IconWrapper className={open ? 'open' : ''}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path
            d="M20.5467 22.12L14.44 16L20.5467 9.88L18.6667 8L10.6667 16L18.6667 24L20.5467 22.12Z"
            fill="white"
          />
        </svg>
      </IconWrapper>
    </Content>
  </Root>
);

export default SidebarHeader;