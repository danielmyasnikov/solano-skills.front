import cn from 'classnames';

import Done from '@assets/Done';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const Root = styled(Box)`
  position: relative;
  color: rgba(116, 105, 239, 1);
  background: #9d96f4;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 17px;
  font-weight: bold;
  cursor: not-allowed;

  &:not(:last-child) {
    margin-right: 15px;
  }

  &.active {
    cursor: default;
    background: var(--color-white);
    color: var(--purple);
    box-shadow: inset 1px 1px 4px rgb(0 0 0 / 25%);
  }

  &.done {
    cursor: default;
    background: #45c679;
  }
`;

const Inner = styled('span')`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const BulletPoint = ({ onClick, isActive, isDone, index }) => (
  <Root
    className={cn({
      active: isActive,
      done: isDone,
    })}
    onClick={isDone ? () => {} : onClick}
  >
    <Inner>{isDone ? <Done /> : index + 1}</Inner>
  </Root>
);
