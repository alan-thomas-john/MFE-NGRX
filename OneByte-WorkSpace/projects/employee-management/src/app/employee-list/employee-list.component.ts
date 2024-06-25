import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../state/employee.model';
import { Store, select } from '@ngrx/store';
import { EmployeeState } from '../state/employee.reducer';
import { selectAllEmployees } from '../state/employee.selectors';
import { deleteEmployeeSuccess } from '../state/employee.actions';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]> | undefined;
  employees: any;
  isEmpty: boolean = true;

  constructor(private store: Store<{ employees: EmployeeState }>) {}

  ngOnInit() {
    this.employees$ = this.store.pipe(select(selectAllEmployees));
    this.employees$.subscribe((employees) => {
      console.log('Employees in component:', employees);
      if (employees.length != 0) {
        this.isEmpty = false;
      }
    });
  }
  deleteEmployees(emailId: string) {
    this.store.dispatch(deleteEmployeeSuccess({ emailId }));
  }
}
