import { useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { selectStackType, selectExerciseType } from '../store/selectors/exercise.selectors';

import UnixShell from './UnixShell';
import Terminal from './Terminal';

import Output from './Output/index.tsx';
import SingleRanging from './Ranging/Single';
import MultipleRanging from '@src/features/exercises/Stack/Ranging/Multiple';

const Root = styled(Box)`
  flex-direction: column;
  flex: 1 1;
  display: flex;
  height: 100%;
  width: 60%;
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

const Stack = ({ width }) => {
  const type = useSelector(selectExerciseType);
  const stackType = useSelector(selectStackType);

  const renderStack = () => {
    switch (type) {
      case 'single_bascket':
        return <SingleRanging />;
      case 'multiple_bascket':
        return <MultipleRanging />;
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

  return <Root sx={{ width }}>{renderStack()}</Root>;
};

export default Stack;
