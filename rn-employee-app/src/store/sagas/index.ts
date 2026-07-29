import { all } from 'redux-saga/effects';
import { employeeSaga } from './employeeSaga';

export function* rootSaga() {
  yield all([
    employeeSaga(),
  ]);
}
