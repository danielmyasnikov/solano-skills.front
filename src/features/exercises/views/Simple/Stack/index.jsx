import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import {
  selectStackType,
  selectExerciseType,
  selectCurrentExercise,
} from '../../../store/selectors';

import UnixShell from './UnixShell';
import Terminal from './Terminal';

import Output from './Output';
import DndBlock from '@src/features/exercises/views/Simple/Stack/MultipleRanging';
import React from 'react';
import SingleRanging from '@src/features/exercises/views/Simple/Stack/SingleRanging';

const Root = styled(Box)`
  flex-direction: column;
  flex: 1 1;
  display: flex;
  height: 100%;
  gap: 5px;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media screen and (max-width: 768px) {
    margin-top: 32px;
    width: 100%;
    height: initial;
    flex: none;
    :global {
      .ace_editor {
        min-height: 596px;
      }
    }
  }
`;

const Stack = () => {
  const type = useSelector(selectExerciseType);
  const stackType = useSelector(selectStackType);

  const renderStack = () => {
    switch (type) {
      case 'single_bascket':
      case 'multiple_bascket':
        return <SingleRanging />;
      default:
        break;
    }

    switch (stackType) {
      case 'shell':
        return <UnixShell />;
      case 'python':
        return (
          <>
            {type !== 'quiz' && <Terminal />}
            <Output variant={type === 'quiz' ? 'quizOutputContainer' : 'outputContainer'} />
          </>
        );
      default:
        throw Error('not implement');
    }
  };

  return <Root>{renderStack()}</Root>;
};

export default Stack;
