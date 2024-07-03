import { createReducer, on } from '@ngrx/store';
import {
  addEmployee,
  addEmployeeFailure,
  addEmployeeSuccess,
  deleteEmployeeSuccess,
  resetSearch,
  searchEmployees,
  errorNull,
  employeeNull,
  setEmployees,
  deleteEmployeeFailure
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
// const filterUniqueEmployees = (employees: Employee[]) => {
//   return employees.reduce((acc: Employee[], curr: Employee) => {
//     if (!acc.some(emp => emp.id === curr.id)) {
//       acc.push(curr);
//     }
//     return acc;
//   }, []);
// };

export const employeeReducer = createReducer(
  initialState,

  on(addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    employeeDetails:employee,
    error: null
  })),

  on(addEmployeeFailure, (state, { error }) => ({
    ...state,
    employeeDetails:null,
    error:error
  })),
  on(errorNull, (state) => ({
    ...state,
    error:null
  })),
  on(employeeNull, (state) => ({
    ...state,
    employeeDetails:null
  })),

  on(setEmployees, (state, { employees }) => ({
    ...state,
    employees,
    error: null,
  })),

  // // for deleting emloyees
  // on(deleteEmployeeSuccess, (state, { id }) => ({
  //   ...state,
  //   // employees: [...state.employees.filter(employee => employee.id !== id)]
  // })),

  on(deleteEmployeeSuccess, (state, { id }) => ({
    ...state,
    employees: state.employees.filter(
      (employee) => employee.id !== id
    ),
  })),

  on(deleteEmployeeFailure, (state, { error}) => ({
    ...state,
    employeeDetails: null,
    error:error
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
