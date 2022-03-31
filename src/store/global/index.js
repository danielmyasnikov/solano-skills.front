import { combineReducers } from 'redux';
import { layoutSlice } from '@store/global/layout';
import { modalsSlice } from '@store/global/modals';

export const globalReducers = combineReducers({
  layout: layoutSlice.reducer,
  modals: modalsSlice.reducer,
});
