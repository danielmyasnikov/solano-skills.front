import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { terminalSlice } from '../store/slices/terminal.slice';
import { bashSlice } from '../store/slices/bash.slice';

import { getExerciseById } from '@src/features/exercises/store/actions/exercises.actions';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { selectExercisesStatus } from '@src/features/exercises/store/selectors/exercises.selectors';
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
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const { courseId, exerciseId } = useParams();

  const status = useSelector(selectExercisesStatus);

  useEffect(() => {
    dispatch(terminalSlice.actions.clear());
    dispatch(bashSlice.actions.clear());

    dispatch(getExerciseById({ courseId, exerciseId: exerciseId, tab: query.get('tab') }));
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
