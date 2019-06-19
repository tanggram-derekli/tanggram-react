import {fork, actionChannel, take, delay} from 'redux-saga/effects';
import {buffers} from 'redux-saga';

export const takeOneExclusive = (ms, pattern, task, ...args) => fork(function*() {
  const throttleChannel = yield actionChannel(pattern, buffers.sliding(0));
  while (true) {
    const action = yield take(throttleChannel);
    yield fork(task, ...args, action);
    yield delay(ms);
  }
});
