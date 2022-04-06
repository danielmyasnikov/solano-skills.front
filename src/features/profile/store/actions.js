import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '@src/api/api';

export const deleteAccount = createAsyncThunk('profileNew/deleteAccount', async () => {
  return await Api.get('/api/v1/delete_profile');
});
