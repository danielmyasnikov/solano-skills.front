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
      state.windowReference.document.body.innerHTML = 'loading...';
    },
    [paySubscription.rejected]: (state, action) => {
      state.windowReference = null;
    },
    [paySubscription.fulfilled]: (state, action) => {
      const win = state.windowReference;
      setTimeout(() => {
        win.location = action.payload.form_url;
      }, 2000);
    },
    [unsubscribe.fulfilled]: (state, action) => {
      state.status = 'success';
    },
    [unsubscribe.rejected]: (state, action) => {
      state.status = 'failure';
    },
  },
});
