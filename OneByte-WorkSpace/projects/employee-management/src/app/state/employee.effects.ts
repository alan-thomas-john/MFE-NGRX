import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  addEmployee,
  addEmployeeFailure,
  addEmployeeSuccess,
} from './employee.actions';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

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
}
