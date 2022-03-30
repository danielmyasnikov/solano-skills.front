import { useSelector } from 'react-redux';

import { selectExerciseSidebar } from '@src/features/exercises/store/selectors';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import SidebarHeader from './Header';
import SidebarBody from './Body';

import InstructionHeader from './Instruction/Header';
import InstructionBody from './Instruction/Body';
import Draggable from '@components/common/draggable';

const Root = styled(Box)`
  overflow-x: hidden;

  background: var(--color-white);
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.04);
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    margin-right: 0;
  }

  &.folded {
    margin-right: 0;

    width: 44px;
    border-radius: 4px;
    height: 100%;
  }
`;

const SidebarWrapper = styled(Box)`
  position: relative;

  padding-top: 46px;

  overflow-y: auto;
`;

export const Sidebar = ({ wrapperRef }) => {
  const { open, headerFolded, instructionFolded } = useSelector(selectExerciseSidebar);

  return (
    <Root className={open ? '' : 'folded'}>
      <SidebarHeader />
      <SidebarWrapper>
        {open && (
          <>
            <SidebarBody />

            <InstructionHeader />
            <InstructionBody />

            <Draggable
              resizeContainer={wrapperRef}
              parentContainer={wrapperRef}
              hidden={!open || headerFolded || instructionFolded}
              noIcon
              mt
            />
          </>
        )}
      </SidebarWrapper>
    </Root>
  );
};
