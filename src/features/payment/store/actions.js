import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '@src/api/api';

export const paySubscription = createAsyncThunk('payment/paySubscription', async (id) => {
  return await Api.post(`/api/v1/pay`, {
    id,
  });
});

export const checkOrderStatus = createAsyncThunk('payment/checkOrderStatus', async (id) => {
  return await Api.post(`/api/v1/order_status`, {
    order_id: id,
  });
});
