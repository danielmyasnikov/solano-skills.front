import { combineReducers } from 'redux';
import { layoutSlice } from '@store/global/layout';

export const globalReducers = combineReducers({
  layout: layoutSlice.reducer,
});
