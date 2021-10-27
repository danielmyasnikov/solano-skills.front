import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers.js';
import rootSaga from './sagas.js';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(sagaMiddleware),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
