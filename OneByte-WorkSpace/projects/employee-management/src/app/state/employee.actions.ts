import { createAction, props } from '@ngrx/store';
import { Employee } from './employee.model';

export const addEmployee = createAction(
  '[Employee] Add Employee',
  props<{ employee: Employee }>()
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
