import { createReducer, on } from '@ngrx/store';
import {
  addEmployee,
  deleteEmployeeSuccess,
  resetSearch,
  searchEmployees,
} from './employee.actions';

import { Employee } from './employee.model';

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
  on(addEmployee, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    registrationError: null,
  })),

  
  on(deleteEmployeeSuccess, (state, { emailId }) => ({
    ...state,
    employees: state.employees.filter(
      (employee) => employee.emailId !== emailId
    ),
  })),

  on(searchEmployees, (state, { searchTerm }) => {
    const filteredEmployees = state.employees.filter((employee) =>
      employee.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    return {
      ...state,
      searchResults: filteredEmployees,
    };
  }),

  on(resetSearch, (state) => ({
    ...state,
    searchResults: [],
  }))
);
