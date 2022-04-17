import api from '@src/http/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const executeBashShell = createAsyncThunk(
  'bash/execute',
  async ({ environmentId, command }: { environmentId: string; command: string }) => {
    const response = await api
      .post(`/console/v1/bash/execute/${environmentId}?command=${command}`)
      .then((res) => res.data);

    return {
      data: response,
      command,
    };
  },
);

export const startEnvironment = createAsyncThunk('bash/startEnvironment', async (exerciseId) => {
  return await api.post(`/console/v1/bash/startEnvironment/${exerciseId}`).then((res) => res.data);
});

export const checkExerciseBashShell = createAsyncThunk(
  'bash/checkExercise',
  async ({
    environmentId,
    exerciseId,
    userId,
    command,
  }: {
    environmentId: string;
    exerciseId: string | number;
    userId: number;
    command: string;
  }) => {
    const response = await api
      .post(
        `/console/v1/bash/checkExercise/${exerciseId}?environemtId=${environmentId}&userId=${userId}`,
        { command: command },
      )
      .then((res) => res.data);

    return {
      data: response,
      command,
    };
  },
);
