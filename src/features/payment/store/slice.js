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
    [paySubscription.fulfilled]: (state, action) => {
      window.open(action.payload.form_url);
    },
    [unsubscribe.fulfilled]: (state, action) => {
      state.status = 'success';
    },
    [unsubscribe.rejected]: (state, action) => {
      state.status = 'failure';
    },
  },
});
