import createSagaMiddleware from 'redux-saga';
import reducer from './reducers.js';
import sagas from './sagas.js';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { certificateApi } from '@src/features/certificates/certificates.api.js';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, certificateApi.middleware, logger),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(sagas);

export default store;
