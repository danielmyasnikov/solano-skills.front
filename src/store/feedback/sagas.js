import { call, takeLeading, put } from 'redux-saga/effects';
import { sendFeedbackApi } from '../api/feedback';
import { SEND_FEEDBACK_SUCCESSED, SEND_FEEDBACK_FAILED, SEND_FEEDBACK_REQUESTED } from './actions';

export function* sendFeedback(action) {
  try {
    const response = yield call(sendFeedbackApi, action.payload, { method: 'POST' });
    yield put({
      type: SEND_FEEDBACK_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: SEND_FEEDBACK_FAILED,
      payload: {
        message: e.message,
      },
    });
  }
}

export default function* feedbackSaga() {
  yield takeLeading(SEND_FEEDBACK_REQUESTED, sendFeedback);
}
