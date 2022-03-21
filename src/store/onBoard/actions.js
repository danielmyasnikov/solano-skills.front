export const GET_TRACKS_REQUESTED = 'GET_TRACKS_REQUESTED';
export const GET_TRACKS_SUCCESSED = 'GET_TRACKS_SUCCESSED';
export const GET_TRACKS_FAILED = 'GET_TRACKS_FAILED';

export const ADD_TRACKS_REQUESTED = 'ADD_TRACKS_REQUESTED';
export const ADD_TRACKS_SUCCESSED = 'ADD_TRACKS_SUCCESSED';
export const ADD_TRACKS_FAILED = 'ADD_TRACKS_FAILED';

export const SEARCH_TRACKS_REQUESTED = 'SEARCH_TRACKS_REQUESTED';
export const SEARCH_TRACKS_SUCCESSED = 'SEARCH_TRACKS_SUCCESSED';
export const SEARCH_TRACKS_FAILED = 'SEARCH_TRACKS_FAILED';

export const SHOW_TRACKS_MODAL = 'SHOW_TRACKS_MODAL';
export const HIDE_TRACKS_MODAL = 'HIDE_TRACKS_MODAL';

export const getTracks = ({ headers }) => {
  return {
    type: GET_TRACKS_REQUESTED,
    payload: { headers },
  };
};

export const addTracks = (tracks, { headers }) => {
  return {
    type: ADD_TRACKS_REQUESTED,
    payload: { tracks, headers },
  };
};

export const searchTracks = (value, { headers }) => {
  return {
    type: SEARCH_TRACKS_REQUESTED,
    payload: { value, headers },
  };
};

export const showTracksModal = () => {
  return {
    type: SHOW_TRACKS_MODAL,
    payload: true,
  };
};

export const hideTracksModal = () => {
  return {
    type: HIDE_TRACKS_MODAL,
    payload: false,
  };
};
