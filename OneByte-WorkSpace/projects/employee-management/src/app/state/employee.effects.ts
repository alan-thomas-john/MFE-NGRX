import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  addEmployee,
  addEmployeeFailure,
  addEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeFailure,
  deleteEmployeeSuccess,
  loadEmployees,
  loadEmployeesFailure,
  loadEmployeesSuccess,
} from './employee.actions';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployee),
      mergeMap((action) =>
        this.employeeService.addEmployee(action.employee).pipe(
          map((response) => {
            const employee = response.user;
            return addEmployeeSuccess({ employee });
          }),
          catchError((error) => {
            const errorMessage = error.error.message || 'Unknown error';
            console.log(errorMessage);
            return of(addEmployeeFailure({ error: errorMessage }));
          })
        )
      )
    )
  );
  deleteEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployee),
      mergeMap(action =>
        this.employeeService.deleteEmployee(action.id).pipe(
          map(() => deleteEmployeeSuccess({ id: action.id })),
          catchError(error => of(deleteEmployeeFailure({ error: error.message || 'unknown error' })))
        )
      )
    ),
    {dispatch:false}
  );

  //
  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      mergeMap(() =>
        this.employeeService.getAllEmployees().pipe(
          map((employees) => {
            console.log('Employees fetched:', employees); // Debugging log
            return loadEmployeesSuccess({ employees });
          }),
          catchError((error) => {
            console.error('Error fetching employees:', error); // Debugging log
            return of(loadEmployeesFailure({ error }));
          })
        )
      )
    )
  );
}
