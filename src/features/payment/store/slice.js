import { createSlice } from '@reduxjs/toolkit';
import {
  checkOrderStatus,
  paySubscription,
  unsubscribe,
} from '@src/features/payment/store/actions';

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    status: 'idle',
    windowReference: null,
  },
  reducers: {},
  extraReducers: {
    [checkOrderStatus.fulfilled]: (state, action) => {
      state.status = action.payload.order_status === 2 ? 'success' : 'failure';
    },
    [checkOrderStatus.rejected]: (state, action) => {
      state.status = 'failure';
    },
    [checkOrderStatus.pending]: (state) => {
      state.status = 'loading';
    },
    [paySubscription.pending]: (state, action) => {
      state.windowReference = window.open();
    },
    [paySubscription.rejected]: (state, action) => {
      state.windowReference = null;
    },
    [paySubscription.fulfilled]: (state, action) => {
      state.windowReference.location = action.payload.form_url;
    },
    [unsubscribe.fulfilled]: (state, action) => {
      state.status = 'success';
    },
    [unsubscribe.rejected]: (state, action) => {
      state.status = 'failure';
    },
  },
});
