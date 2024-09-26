import { all } from 'redux-saga/effects';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { watchers as queryWatcher, queryStore } from './query-model';


function* rootSaga() {
  yield all(combineWatherGenerators(
    queryWatcher
  ));
}

const rootReducer = combineReducers({
  queryStore
});

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);
sagaMiddleware.run(rootSaga);


function combineWatherGenerators(...watchers) {
  const watcherGenerators = [];
  watchers.forEach(item => {
    item.forEach(watcherItem => {
      watcherGenerators.push(watcherItem());
    })
  });
  return watcherGenerators;
}