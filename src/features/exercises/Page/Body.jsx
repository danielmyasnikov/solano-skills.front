import { useEffect } from 'react';
import Exercise from '@src/features/exercises/views/Simple';
import { useSelector } from 'react-redux';
import { selectRootExercise } from '@src/features/exercises/store/selectors';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { certificateApi } from '@src/features/certificates/certificates.api';
import { Api } from '@src/api/api';
import VideoExercise from '@src/features/exercises/views/Video';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const Root = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 73px);
  width: 100%;
  overflow: hidden;

  padding-top: 30px;
  padding-bottom: 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
    height: 100%;
  }
`;

export default function ExercisePageBody() {
  const exercise = useSelector(selectRootExercise);
  const history = useHistory();
  const { courseId } = useParams();
  const { data, error } = certificateApi.useTakeCertificateMutation(exercise?.course_slug);
  console.log(exercise?.course_slug);
  console.log(data, error);

  if (!exercise) {
    return null;
  }

  const goNext = async () => {
    history.push(`/courses/${courseId}/exercises/${exercise.next_exercise_id}`);
  };

  switch (exercise?.type) {
    case 'video':
      return <VideoExercise goNext={goNext} />;
    case 'single_bascket':
    case 'multiple_bascket':
    case 'bullet_point_exercise':
    case 'normal_exercise':
    case 'quiz':
      return (
        <Root>
          <Exercise goNext={goNext} />
        </Root>
      );
    default:
      throw Error('not implement');
  }
}
