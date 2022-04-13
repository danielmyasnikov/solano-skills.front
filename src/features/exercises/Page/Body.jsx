import { useState } from 'react';
import Exercise from '@src/features/exercises/views/Exercise';
import VideoExercise from '@src/features/exercises/views/Video';
import { useDispatch, useSelector } from 'react-redux';
import { selectRootExercise } from '@src/features/exercises/store/selectors/exercises.selectors';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FailFIOModal from '@src/features/exercises/Page/FailFIOModal';
import { CongratulationsModal } from './CongragulationsModal';
import { NotCompleteModal } from '@src/features/exercises/Page/NotCompleteModal';
import { selectIsAuth, selectProfile } from '@store/profile/selector';
import { openPleasePayModal, openSignUpModal } from '@store/global/modals';
import { useRefetchCoursesMutation } from '@src/features/courses/courses.api.ts';
import Helmet from 'react-helmet';
import { AuthContainer } from '@components/auth/authContainer';

const Root = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 73px);
  width: 100%;
  overflow: hidden;

  padding: 30px 24px 50px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
    height: 100%;
  }
`;

export default function ExercisePageBody() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [showFailFIOModal, setShowFailFIOModal] = useState(false);
  const [showCourseIsNotCompletedModal, setShowCourseIsNotCompletedModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const exercise = useSelector(selectRootExercise);
  const history = useHistory();

  const [updateCourses] = useRefetchCoursesMutation();

  const profile = useSelector(selectProfile);

  const isAuth = useSelector(selectIsAuth);

  if (!exercise) {
    return null;
  }

  const goNext = async () => {
    updateCourses();

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
        if (exercise.next_exercise_id) {
          const payedTill = new Date(`${profile.payed_till}T00:00:00Z`);
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          const isActiveSub = payedTill >= now;

          if (exercise.is_free || isActiveSub) {
            await history.push(`/courses/${courseId}/exercises/${exercise.next_exercise_id}`);
          } else {
            dispatch(openPleasePayModal());
          }
        } else {
          if (!isAuth) {
            dispatch(openSignUpModal({}));
          }
        }
        break;
    }
  };

  const renderContent = () => {
    switch (exercise?.type) {
      case 'video':
        return <VideoExercise goNext={goNext} />;
      case 'single_bascket':
      case 'multiple_bascket':
      case 'bullet_point_exercise':
      case 'quiz_with_script':
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
      <Helmet title={exercise?.title ? exercise.title : 'Упражнение'} />
      <FailFIOModal isShow={showFailFIOModal} />
      <CongratulationsModal isShow={showCongratulationsModal} />
      <NotCompleteModal isShow={showCourseIsNotCompletedModal} />
      {renderContent()}
    </>
  );
}
