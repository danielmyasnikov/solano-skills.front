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
import CertModal from '@src/features/exercises/Page/CertModal';
import { CongratulationsModal } from './CongragulationModal/CongragulationsModal';

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
  const [showModal, setShowModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const exercise = useSelector(selectRootExercise);
  const history = useHistory();
  const { courseId } = useParams();
  const [takeCertificateApi] = useTakeCertificateMutation(courseId);

  if (!exercise) {
    return null;
  }

  const takeCertificate = async () => {
    const res = await takeCertificateApi(courseId);
    history.push(`/certificates/${res.data.id}`);
  };

  const goNext = async () => {
    switch (exercise?.certificate_status) {
      case 'ready':
        await takeCertificate();
        setShowCongratulationsModal(!showCongratulationsModal);
        return;
      case 'information_is_required':
        setShowModal(!showModal);
        return;
      case 'course_is_not_completed':
        return;
      default:
        return;
    }
    history.push(`/courses/${courseId}/exercises/${exercise.next_exercise_id}`);
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
      <CertModal onSubmit={takeCertificate} isShow={showModal} />
      <CongratulationsModal submit={takeCertificate} isShow={showCongratulationsModal} />
      {renderContent()}
    </>
  );
}
