import { createReducer, on } from '@ngrx/store';
import {

  loadEmployeesSuccess,
  loadEmployeesFailure,
  loadEmployees
} from './employee.action';

import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

export interface EmployeeState {
  employeeDetails: Employee | null;
  employees: Employee[];
  loading: boolean;
  error: any;
  searchResults: Employee[];
}
export const initialState: EmployeeState = {
  employeeDetails: null,
  loading: false,
  error: null,
  employees: [],
  searchResults: [],
};

export const employeeReducer = createReducer(
    initialState,
  
  
    on(loadEmployees, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
  
    on(loadEmployeesSuccess, (state, { employees }) => ({
      ...state,
      employees,
      loading: false,
      error: null
    })),
  
    on(loadEmployeesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

);