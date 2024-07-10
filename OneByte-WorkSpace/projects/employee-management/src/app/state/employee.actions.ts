import { createAction, props } from '@ngrx/store';
import { Employee } from './employee.model';

export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: Employee }>()
);

export const loadEmployees = createAction('[Employee] Load Employees');

export const loadEmployeesSuccess = createAction(
  '[Employee] Load Employees Success',
  props<{ employees: Employee[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employee] Load Employees Failure',
  props<{ error: any }>()
);

export const addEmployeeSuccess = createAction(
  '[Employee] Add Employee Success',
  props<{ employee: Employee }>()
);

export const addEmployeeFailure = createAction(
  '[Employee] Add Employee Failure',
  props<{ error: any }>()
);
export const errorNull = createAction(
  '[Employee] Error Null',
);
export const employeeNull = createAction(
  '[Employee] Employee Null',
);

// action to set employees
export const setEmployees = createAction(
  '[Employee] Set Employees',
  props<{ employees: Employee[] }>()
);


export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Employee Success',
  props<{ id: number}>()
);
export const deleteEmployeeFailure = createAction(
  '[Employee] Delete Employee Success',
  props<{ error: string }>()
);
export const deleteEmployee = createAction(
  '[Employee] Delete Employee Success',
  props<{  id: number }>()
);


export const searchEmployees = createAction(
  '[Employee] Search Employees',
  props<{ searchTerm: string }>()
);

export const setSearchResults = createAction(
  '[Employee] Set Search Results',
  props<{ employees: Employee[] }>()
);

export const resetSearch = createAction('[Employee] Reset Search');
