import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Employee } from './employee.model';
import { EmployeeState } from './employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

export const selectSearchResults = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.searchResults
);

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.employees
);

export const selectEmployeeError = createSelector(
  selectEmployeeState,
  (state: EmployeeState) => state.error
);