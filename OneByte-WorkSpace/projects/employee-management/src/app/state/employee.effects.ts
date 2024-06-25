import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { addEmployee, addEmployeeFailure, addEmployeeSuccess } from './employee.actions';
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
      mergeMap(action =>
        this.employeeService.addEmployee(action.employee).pipe(
          map((employee: Employee) => addEmployeeSuccess({ employee })),
          catchError(error => of(addEmployeeFailure({ error })))
        )
      )
    )
  );
}
