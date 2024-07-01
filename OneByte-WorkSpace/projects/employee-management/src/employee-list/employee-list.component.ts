import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../app/state/employee.model';
import { Store, select } from '@ngrx/store';
import { EmployeeState } from '../app/state/employee.reducer';
import { selectAllEmployees } from '../app/state/employee.selectors';
import { deleteEmployeeSuccess, setEmployees } from '../app/state/employee.actions';
import { EmployeeService } from '../app/state/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees$: Observable<Employee[]> | undefined;
  employees: any;
  isEmpty: boolean = true;

  constructor(
    private store: Store<{ employees: EmployeeState }>,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees: Employee[]) => {
        console.log('Fetched employees from backend:', employees);
        this.isEmpty = employees.length === 0;
        this.store.dispatch(setEmployees({ employees }));
        this.employees$ = this.store.pipe(select(selectAllEmployees));
        console.log('employees from the store', this.employees$);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        this.snackBar.open('Error fetching employees', 'Close', {
          duration: 3000,
          verticalPosition: 'top', // Position the snackbar at the top
        });
      },
    });

    this.employees$ = this.store.pipe(select(selectAllEmployees));
  }


  deleteEmployees(emailId: string) {
    this.store.dispatch(deleteEmployeeSuccess({ emailId }));
  }
}
