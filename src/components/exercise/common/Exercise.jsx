import React from 'react';
import Terminal from '@assets/terminal.png';
import SectionHeader from '@components/exercise/common/SectionHeader';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const IconWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  margin-left: 5px;
  margin-right: -13px;
`;

const Separator = styled(Box)`
  width: 2px;
  height: 100%;

  background-color: var(--color-white);
`;

const Content = styled(Box)`
  height: 50%;
  overflow-y: auto;
  padding: 15px 20px 40px;

  p {
    margin-top: 20px;

    & > img {
      display: block;
      width: 100%;
    }
  }

  p,
  li,
  code {
    font-size: 16px;
  }

  li {
    margin-left: 20px;
    list-style-type: decimal;
  }
`;

export const Exercise = ({ exercise }) => (
  <>
    <SectionHeader
      icon={<img width="24px" height="24px" src={Terminal} alt="Logo" />}
      title="Упражнение"
      bordered
    >
      <Separator />
      <IconWrapper>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path
            d="M20.5467 22.12L14.44 16L20.5467 9.88L18.6667 8L10.6667 16L18.6667 24L20.5467 22.12Z"
            fill="white"
          />
        </svg>
      </IconWrapper>
    </SectionHeader>
    <Content>
      <h1 dangerouslySetInnerHTML={{ __html: exercise.title || 'Заголовок не задан' }} />
      <div dangerouslySetInnerHTML={{ __html: exercise.description }} />
    </Content>
  </>
);
