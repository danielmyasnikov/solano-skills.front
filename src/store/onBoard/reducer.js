import {
  GET_TRACKS_SUCCESSED,
  GET_TRACKS_FAILED,
  ADD_TRACKS_SUCCESSED,
  SEARCH_TRACKS_SUCCESSED,
  ADD_TRACKS_FAILED,
  HIDE_TRACKS_MODAL,
} from './actions';

const initialState = { trackList: [], isShowWelcomeModal: false };

export default function onBoardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRACKS_SUCCESSED: {
      return {
        trackList: action.payload.data,
        isShowWelcomeModal: false,
      };
    }
    case ADD_TRACKS_SUCCESSED: {
      return {
        ...state,
        isShowWelcomeModal: true,
      };
    }
    case SEARCH_TRACKS_SUCCESSED: {
      return {
        ...state,
        trackList: action.payload.data,
      };
    }
    case HIDE_TRACKS_MODAL: {
      return {
        isShowWelcomeModal: false,
      };
    }
    case ADD_TRACKS_FAILED: {
      return {
        ...state,
        isShowWelcomeModal: false,
      };
    }
    case GET_TRACKS_FAILED: {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
