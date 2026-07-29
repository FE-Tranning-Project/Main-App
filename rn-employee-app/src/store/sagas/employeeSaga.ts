import { call, put, takeLatest } from 'redux-saga/effects';
import { employeeApi } from '../../api/employeeApi';
import { Employee } from '@thangnoob/ui-components';
import {
  fetchEmployeesRequest,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  createEmployeeRequest,
  createEmployeeSuccess,
  createEmployeeFailure,
  updateEmployeeRequest,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  deleteEmployeeRequest,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
} from '../reducers/employeeSlice';

// Fetch All
function* fetchEmployeesSaga(): Generator<any, void, any> {
  try {
    const employees: Employee[] = yield call(employeeApi.getAll);
    yield put(fetchEmployeesSuccess(employees));
  } catch (error: any) {
    yield put(fetchEmployeesFailure(error.message || 'Failed to fetch employees'));
  }
}

// Create
function* createEmployeeSaga(action: ReturnType<typeof createEmployeeRequest>): Generator<any, void, any> {
  try {
    const newEmployee: Employee = yield call(employeeApi.create, action.payload);
    yield put(createEmployeeSuccess(newEmployee));
    // Optional: yield put(fetchEmployeesRequest());
  } catch (error: any) {
    yield put(createEmployeeFailure(error.message || 'Failed to create employee'));
  }
}

// Update
function* updateEmployeeSaga(action: ReturnType<typeof updateEmployeeRequest>): Generator<any, void, any> {
  try {
    const { id, data } = action.payload;
    const updatedEmployee: Employee = yield call(employeeApi.update, id, data);
    yield put(updateEmployeeSuccess(updatedEmployee));
  } catch (error: any) {
    yield put(updateEmployeeFailure(error.message || 'Failed to update employee'));
  }
}

// Delete
function* deleteEmployeeSaga(action: ReturnType<typeof deleteEmployeeRequest>): Generator<any, void, any> {
  try {
    yield call(employeeApi.delete, action.payload);
    yield put(deleteEmployeeSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteEmployeeFailure(error.message || 'Failed to delete employee'));
  }
}

export function* employeeSaga() {
  yield takeLatest(fetchEmployeesRequest.type, fetchEmployeesSaga);
  yield takeLatest(createEmployeeRequest.type, createEmployeeSaga);
  yield takeLatest(updateEmployeeRequest.type, updateEmployeeSaga);
  yield takeLatest(deleteEmployeeRequest.type, deleteEmployeeSaga);
}
