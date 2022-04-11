import createSagaMiddleware from 'redux-saga';
import reducer from './reducers.js';
import sagas from './sagas.js';
import { Action, configureStore, Middleware, ThunkAction } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { certificateApi } from '@src/features/certificates/certificates.api';
import { coursesApi } from '@src/features/courses/courses.api';
import { tariffsApi } from '@src/features/payment/store/tariffs.api';
import { professionApi } from '@src/features/professions/professions.api';
import { skillApi } from '@src/features/skills/skills.api';
import { env } from '@src/app/config';

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [
  sagaMiddleware,
  certificateApi.middleware,
  coursesApi.middleware,
  tariffsApi.middleware,
  professionApi.middleware,
  skillApi.middleware,
];

if (!env.isProduction) {
  middlewares.push(
    createLogger({
      collapsed: (_, __, logEntry) => !logEntry?.error,
    }),
  );
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: !env.isProduction,
});

sagaMiddleware.run(sagas);

declare global {
  type AppDispatch = typeof store.dispatch;
  type RootState = ReturnType<typeof reducer>;
  type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
}
declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export default store;
