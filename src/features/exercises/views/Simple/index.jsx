import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';

import styles from './styles.module.less';
import { Sidebar } from '@src/features/exercises/views/Simple/Sidebar';
import { selectKernelId } from '@store/terminal/selector';
import { FeedbackModal } from '@components/common/modals/feedback';
import ErrorMessage from '@src/features/exercises/views/Simple/ErrorMessage';
import CompletedTaskModal from '@src/features/exercises/views/Simple/CompletedTaskModal';

import Stack from './Stack';
import WarningMobile from '@src/features/exercises/views/Simple/WarningMobile';
import Hint from '@src/features/exercises/views/Simple/Hints/Hint';
import HintFeedback from '@src/features/exercises/views/Simple/Hints/HintFeedback';
import SolutionHint from '@src/features/exercises/views/Simple/Hints/SolutionHint';
import {
  selectExerciseContext,
  selectExerciseSidebar,
  selectFeedbackModal,
  selectRootExerciseType,
  selectSignupModal,
  selectSteps,
} from '@src/features/exercises/store/selectors';
import { exercisesSlice } from '../../store/slices/exercises.slice';
import RegistrationModal from '@components/common/modals/registration/registrationModal';
import { useEffect, useRef } from 'react';
import { sendAnswer } from '@src/features/exercises/store/actions';

function Exercise({ goNext }) {
  const dispatch = useDispatch();
  const wrapperRef = useRef();

  const kernelId = useSelector(selectKernelId);

  const type = useSelector(selectRootExerciseType);
  const { active, total, totalDone } = useSelector(selectSteps);

  const { open: sidebarOpen } = useSelector(selectExerciseSidebar);
  const { completed, exercise, xp } = useSelector(selectExerciseContext);
  const feedbackModal = useSelector(selectFeedbackModal);
  const signupModal = useSelector(selectSignupModal);

  useEffect(() => {
    if (completed) {
      if (type === 'bullet_point_exercise') {
        if (active < total) {
          if (active > totalDone) {
            dispatch(exercisesSlice.actions.onStepComplete({ xp }));
          }
        }
      }

      dispatch(sendAnswer({ exerciseId: exercise.slug, courseId: exercise.course_slug, xp }));
    }
  }, [completed]);

  const isRanging = type === 'single_bascket' || type === 'multiple_bascket';

  return (
    <>
      <WarningMobile />

      <div className={cn(styles.layout, { [styles.folded]: !sidebarOpen })} ref={wrapperRef}>
        <div className={styles.content}>
          <Sidebar wrapperRef={wrapperRef} />
          <ErrorMessage />
          {kernelId && sidebarOpen && (
            <>
              <Hint />
              <HintFeedback />
              <SolutionHint />
            </>
          )}
        </div>
        {completed && (type !== 'bullet_point_exercise' || active === total) && (
          <CompletedTaskModal onClick={goNext} />
        )}
      </div>

      {isRanging ? <>basket</> : <Stack />}

      {feedbackModal && (
        <FeedbackModal onClose={() => dispatch(exercisesSlice.actions.closeFeedbackModal({}))} />
      )}
      {signupModal && (
        <RegistrationModal onClose={() => dispatch(exercisesSlice.actions.closeSignupModal({}))} />
      )}
    </>
  );
}

export default Exercise;
