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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private snackbar: MatSnackBar
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
          map(employees => loadEmployeesSuccess({ employees })),
          catchError(error => of(loadEmployeesFailure({ error })))
        )
      )
    )
  );

  loadEmployeesSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployeesSuccess),
      tap(({ employees }) => {
        if (employees.length === 0) {
          this.snackbar.open('No employees found', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      })
    ),
    { dispatch: false }
  );
}
