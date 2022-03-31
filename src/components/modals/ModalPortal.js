import { useDispatch, useSelector } from 'react-redux';
import {
  selectFeedbackModal,
  selectSignUpModal,
  selectTariffsModal,
  selectCourseContentModal,
} from '@store/global/modals.selectors';
import {
  closeCourseContentModal,
  closeFeedbackModal,
  closeSignUpModal,
  closeTariffsModal,
} from '@store/global/modals';

import SignUpModal from './SignUpModal';
import TariffsModal from './TariffsModal';
import FeedbackModal from './FeedbackModal';
import CourseContentModal from './CourseContentModal';

export const ModalPortal = () => {
  const dispatch = useDispatch();

  const feedbackModal = useSelector(selectFeedbackModal);
  const signUpModal = useSelector(selectSignUpModal);
  const tariffsModal = useSelector(selectTariffsModal);
  const courseContentModal = useSelector(selectCourseContentModal);

  return (
    <div id="modal-portal">
      {feedbackModal && <FeedbackModal onClose={() => dispatch(closeFeedbackModal({}))} />}
      {tariffsModal && <TariffsModal onClose={() => dispatch(closeTariffsModal({}))} />}
      {signUpModal && <SignUpModal onClose={() => dispatch(closeSignUpModal({}))} />}
      {courseContentModal && (
        <CourseContentModal onClose={() => dispatch(closeCourseContentModal({}))} />
      )}
    </div>
  );
};
