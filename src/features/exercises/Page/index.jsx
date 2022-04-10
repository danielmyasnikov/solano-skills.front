import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clearTerminal } from '../terminal/actions';
import { clearBashShell } from '../bash/actions';

import { getExerciseById } from '@src/features/exercises/store/actions';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { selectExercisesStatus } from '@src/features/exercises/store/selectors';
import ExercisePageBody from '@src/features/exercises/Page/Body';
import { Preloader } from '@components/mui/Preloader';

const Root = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 73px);
  width: 100%;
  overflow: hidden;

  padding-top: 30px;
  padding-bottom: 50px;
`;

function ExercisePage() {
  const dispatch = useDispatch();
  const { courseId, exerciseId } = useParams();

  const status = useSelector(selectExercisesStatus);

  useEffect(() => {
    dispatch(clearBashShell());
    dispatch(clearTerminal());

    dispatch(getExerciseById({ courseId, exerciseId: exerciseId }));
  }, [courseId, exerciseId]);

  switch (status) {
    case 'success':
      return <ExercisePageBody />;
    case 'error':
      return <>Что-то пошло не так...</>;
    case 'pending':
    case 'idle':
      return (
        <Root>
          <Preloader />
        </Root>
      );
    default:
      return null;
  }
}

export default ExercisePage;
