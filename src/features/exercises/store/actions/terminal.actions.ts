import api from '@src/http/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const compileCode = createAsyncThunk(
  'terminal/compileCode',
  async ({
    code,
    exerciseId,
    isGraphRequired,
  }: {
    code: string;
    exerciseId: string | number;
    isGraphRequired: boolean;
  }) => {
    return api
      .post(`/executeWithExercise/${exerciseId}?isGraphRequired=${isGraphRequired}`, {
        code,
      })
      .then((res) => res.data)
      .catch((e) => ({
        message: e.message,
      }));
  },
);

export const compileShell = createAsyncThunk(
  'terminal/compileShell',
  async ({
    code,
    type,
    kernelId,
    lineNumber,
    exerciseId,
    isGraphRequired,
  }: {
    type?: 'compileExercise';
    code: string;
    kernelId: string;
    exerciseId: string | number;
    lineNumber?: number;
    isGraphRequired: boolean;
  }) => {
    return {
      type,
      data: await api
        .post(
          `/shell/execute/${kernelId}?exerciseId=${exerciseId}&isGraphRequired=${isGraphRequired}`,
          {
            code,
            exerciseId,
          },
        )
        .then((res) => res.data)
        .catch((e) => ({
          message: e.message,
        })),
      lineNumber,
      code,
    };
  },
);

export const startKernel = createAsyncThunk(
  'terminal/startKernel',
  async (exerciseId: string | number) => {
    return api
      .post(`/shell/startKernel/${exerciseId}`)
      .then((res) => res.data)
      .catch((e) => ({
        message: e.message,
      }));
  },
);

export const checkAnswer = createAsyncThunk(
  'terminal/checkAnswer',
  async ({
    code,
    exerciseId,
    isGraphRequired,
    xp,
    userId,
  }: {
    code: string;
    exerciseId: string | number;
    userId: number;
    isGraphRequired: boolean;
    xp: number;
  }) => {
    return api
      .post(
        `/checkExercise/${exerciseId}?isGraphRequired=${isGraphRequired}&xp=${xp}&userId=${userId}`,
        {
          code,
        },
      )
      .then((res) => res.data)
      .catch((e) => ({
        message: e.message,
      }));
  },
);
