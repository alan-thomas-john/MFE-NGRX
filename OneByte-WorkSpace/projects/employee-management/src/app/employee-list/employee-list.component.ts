import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, Observable, take } from 'rxjs';
import { Employee } from '../state/employee.model';
import { Store, select } from '@ngrx/store';
import { EmployeeState } from '../state/employee.reducer';
import { selectAllEmployees } from '../state/employee.selectors';
import {
  deleteEmployee,
  loadEmployees,
} from '../state/employee.actions';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]> | undefined;
  isEmpty: boolean = true;
  loading: boolean = true;

  constructor(
    private store: Store<{ employees: EmployeeState }>,
  ) { }

  ngOnInit() {
    // Dispatching loadEmployees action to fetch employees from backend
    this.store.dispatch(loadEmployees());

    // Subscribe to employee state
    this.employees$ = this.store.pipe(select(selectAllEmployees));

    this.employees$.subscribe((employees) => {
      console.log('Employees in component:', employees); // Debugging log
      this.loading = false;
      this.isEmpty = employees.length === 0;
    });
  }

  deleteEmployees(id: number) {
    this.store.dispatch(deleteEmployee({ id }))
  }
}
