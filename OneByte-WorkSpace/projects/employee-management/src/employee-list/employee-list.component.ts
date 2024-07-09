import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, Observable, take } from 'rxjs';
import { Employee } from '../app/state/employee.model';
import { Store, select } from '@ngrx/store';
import { EmployeeState } from '../app/state/employee.reducer';
import { selectAllEmployees } from '../app/state/employee.selectors';
import {
  deleteEmployee,
  loadEmployees,
} from '../app/state/employee.actions';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  // employees$: Observable<Employee[]> | undefined;
  // employees: any;
  // isEmpty: boolean = true;
  employees$: Observable<Employee[]> | undefined;
  isEmpty: boolean = true;
  loading: boolean = true;

  constructor(
    private store: Store<{ employees: EmployeeState }>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Dispatching loadEmployees action to fetch employees from backend
    this.store.dispatch(loadEmployees());

    // Subscribe to loading state
    // this.store.pipe(select((state: { employees: EmployeeState }) => state.employees.loading)).subscribe(loading => {
    //   this.loading = loading;
    // });

      // Subscribe to loading state
      this.store.pipe(
        select((state: { employees: EmployeeState }) => state.employees.loading),
        distinctUntilChanged()
      ).subscribe(loading => {
        this.loading = loading;
      });

    // Subscribe to employee state
    // this.employees$ = this.store.pipe(select(selectAllEmployees));
    // Subscribe to employee state
    this.employees$ = this.store.pipe(
      select(selectAllEmployees),
      distinctUntilChanged()
    );



    this.employees$.pipe(
      take(1)
    ).subscribe((employees) => {
      console.log('Employees in component:', employees); // Debugging log
      this.loading = false;
      this.isEmpty = employees.length === 0;
      if (this.isEmpty) {
        this.snackBar.open('No employees found', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    });
  }

  deleteEmployees(id: number) {
    this.store.dispatch(deleteEmployee({ id }))
  }
}
