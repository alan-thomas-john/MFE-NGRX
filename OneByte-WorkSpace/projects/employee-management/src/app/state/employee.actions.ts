import { createAction, props } from '@ngrx/store';
import { Employee } from './employee.model';

export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: Employee }>()
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

export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete Employee Success',
  props<{ emailId: string }>()
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
