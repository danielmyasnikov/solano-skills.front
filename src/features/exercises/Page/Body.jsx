import { useState } from 'react';
import Exercise from '@src/features/exercises/views/Simple';
import VideoExercise from '@src/features/exercises/views/Video';
import { useSelector } from 'react-redux';
import { selectRootExercise } from '@src/features/exercises/store/selectors';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useTakeCertificateMutation } from '@src/features/certificates/certificates.api';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FailFIOModal from '@src/features/exercises/Page/FailFIOModal';
import { CongratulationsModal } from './CongragulationsModal';
import { NotCompleteModal } from '@src/features/exercises/Page/NotCompleteModal';

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
  const { courseId } = useParams();
  const [showFailFIOModal, setShowFailFIOModal] = useState(false);
  const [showCourseIsNotCompletedModal, setShowCourseIsNotCompletedModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const exercise = useSelector(selectRootExercise);
  const history = useHistory();

  if (!exercise) {
    return null;
  }

  const goNext = async () => {
    switch (exercise?.certificate_status) {
      case 'ready':
        setShowCongratulationsModal(true);
        break;
      case 'information_is_required':
        setShowFailFIOModal(true);
        break;
      case 'course_is_not_completed':
        setShowCourseIsNotCompletedModal(true);
        break;
      default:
        await history.push(`/courses/${courseId}/exercises/${exercise.next_exercise_id}`);
    }
  };

  const renderContent = () => {
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
  };

  return (
    <>
      <FailFIOModal isShow={showFailFIOModal} />
      <CongratulationsModal isShow={showCongratulationsModal} />
      <NotCompleteModal isShow={showCourseIsNotCompletedModal} />
      {renderContent()}
    </>
  );
}
