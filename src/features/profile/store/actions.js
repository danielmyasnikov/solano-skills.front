import { createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '@src/api/api';

export const deleteAccount = createAsyncThunk('profileNew/deleteAccount', async () => {
  return await Api.delete('api/v1/delete_profile');
});

export const changePassword = createAsyncThunk('profileNew/changePassword ', async (data) => {
  return await Api.patch('api/v1/change_password', {
    password: data.newPassword,
    password_confirmation: data.confirmNewPassword,
  });
});
