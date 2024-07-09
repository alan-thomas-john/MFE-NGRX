import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { loadEmployees,loadEmployeesSuccess,loadEmployeesFailure } from './employee.action';
import { EmployeeService } from './employee.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EmployeeEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private snackbar: MatSnackBar
  ) {}


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