import createSagaMiddleware from 'redux-saga';
import reducer from './reducers.js';
import sagas from './sagas.js';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { certificateApi } from '@src/features/certificates/certificates.api.js';
import { coursesApi } from '@src/features/courses/courses.api';
import { tariffsApi } from '@src/features/payment/store/tariffs.api';
import { professionApi } from '@src/features/professions/professions.api';
import { skillApi } from '@src/features/skills/skills.api';
import { env } from '@src/app/config/index.ts';

const logger = createLogger({
  collapsed: (_, __, logEntry) => !logEntry?.error,
});

const sagaMiddleware = createSagaMiddleware();

const apis = [
  certificateApi.middleware,
  coursesApi.middleware,
  tariffsApi.middleware,
  professionApi.middleware,
  skillApi.middleware,
];

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, logger, ...apis),
  devTools: !env.isProduction,
});

sagaMiddleware.run(sagas);

export default store;
