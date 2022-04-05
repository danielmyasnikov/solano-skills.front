import { useDispatch, useSelector } from 'react-redux';
import {
  selectFeedbackModal,
  selectSignUpModal,
  selectTariffsModal,
  selectCourseContentModal,
  selectUnsubscribeModal,
  selectPleasePayModal,
} from '@store/global/modals.selectors';
import {
  closeCourseContentModal,
  closeFeedbackModal,
  closeSignUpModal,
  closeTariffsModal,
  closePleasePayModal,
  closeUnsubscribeModal,
} from '@store/global/modals';

import SignUpModal from './SignUpModal';
import TariffsModal from './TariffsModal';
import FeedbackModal from './FeedbackModal';
import CourseContentModal from './CourseContentModal';
import { PleasePayModal } from '@components/modals/PleasePayModal';
import UnsubscribeModal from './UnsubscribeModal';

export const ModalPortal = () => {
  const dispatch = useDispatch();

  const feedbackModal = useSelector(selectFeedbackModal);
  const signUpModal = useSelector(selectSignUpModal);
  const tariffsModal = useSelector(selectTariffsModal);
  const courseContentModal = useSelector(selectCourseContentModal);
  const pleasePayModal = useSelector(selectPleasePayModal);
  const unsubscribeModal = useSelector(selectUnsubscribeModal);

  return (
    <div id="modal-portal">
      {feedbackModal && <FeedbackModal onClose={() => dispatch(closeFeedbackModal({}))} />}
      {tariffsModal && <TariffsModal onClose={() => dispatch(closeTariffsModal({}))} />}
      {signUpModal && <SignUpModal onClose={() => dispatch(closeSignUpModal({}))} />}
      {courseContentModal && (
        <CourseContentModal onClose={() => dispatch(closeCourseContentModal({}))} />
      )}
      {unsubscribeModal && <UnsubscribeModal onClose={() => dispatch(closeUnsubscribeModal({}))} />}
      {pleasePayModal && <PleasePayModal onClose={() => dispatch(closePleasePayModal({}))} />}
    </div>
  );
};
