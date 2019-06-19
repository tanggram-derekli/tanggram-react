import {fork, all} from 'redux-saga/effects';

export {createState} from './state';
export {takeOneExclusive} from './helper';
export {saveState, loadState, loadStateStore} from './persistence';

export function createRedux(states) {
  const _forkSagas = [];
  const _reducers = {};

  if (Array.isArray(states)) {
    states.forEach(([stateName, stateSagas, stateReducer]) => {
      stateSagas.forEach((saga) => {
        _forkSagas.push(fork(saga));
      });
      _reducers[stateName] = stateReducer;
    });
  }

  function getRootSaga() {
    return function* () {
      yield all(_forkSagas);
    }
  }

  function getReducers() {
    return _reducers;
  }

  return {
    getRootSaga,
    getReducers,
  }
}
