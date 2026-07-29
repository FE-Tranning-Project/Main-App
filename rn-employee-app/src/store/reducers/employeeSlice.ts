import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from 'ui-components';

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
  submitError: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
  submitting: false,
  submitError: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Fetch
    fetchEmployeesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEmployeesSuccess(state, action: PayloadAction<Employee[]>) {
      state.loading = false;
      state.employees = action.payload;
    },
    fetchEmployeesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Create
    createEmployeeRequest(state, action: PayloadAction<Omit<Employee, 'id'>>) {
      state.submitting = true;
      state.submitError = null;
    },
    createEmployeeSuccess(state, action: PayloadAction<Employee>) {
      state.submitting = false;
      state.employees.push(action.payload);
    },
    createEmployeeFailure(state, action: PayloadAction<string>) {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // Update
    updateEmployeeRequest(state, action: PayloadAction<{ id: string | number; data: Partial<Employee> }>) {
      state.submitting = true;
      state.submitError = null;
    },
    updateEmployeeSuccess(state, action: PayloadAction<Employee>) {
      state.submitting = false;
      const index = state.employees.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    updateEmployeeFailure(state, action: PayloadAction<string>) {
      state.submitting = false;
      state.submitError = action.payload;
    },

    // Delete
    deleteEmployeeRequest(state, action: PayloadAction<string | number>) {
      state.submitting = true;
      state.submitError = null;
    },
    deleteEmployeeSuccess(state, action: PayloadAction<string | number>) {
      state.submitting = false;
      state.employees = state.employees.filter((e) => e.id !== action.payload);
    },
    deleteEmployeeFailure(state, action: PayloadAction<string>) {
      state.submitting = false;
      state.submitError = action.payload;
    },
  },
});

export const {
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
} = employeeSlice.actions;

export default employeeSlice.reducer;
