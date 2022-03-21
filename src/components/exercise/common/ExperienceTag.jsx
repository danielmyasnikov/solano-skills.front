import { styled } from '@mui/material/styles';

const Root = styled('span')`
  background: var(--very-light-yellow);
  color: var(--color-black);
  border-radius: 4px;
  margin-left: 25px;
  padding: 3px 6px;
  text-transform: uppercase;
  text-align: center;
  &.right {
    margin-right: auto;
  }
`;

export const ExperienceTag = ({ xp, floatRight }) => (
  <Root className={floatRight ? 'right' : ''}>{xp} xp</Root>
);
