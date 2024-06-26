import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { EmployeeState } from '../state/employee.reducer';
import { addEmployee, employeeNull, errorNull } from '../state/employee.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectEmployee, selectEmployeeError } from '../state/employee.selectors';
import { tap } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  openDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<{ employees: EmployeeState }>
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.store.select(selectEmployee).pipe(
      tap(employee => {
        if (employee) {
          this.snackBar.open(`Employee added successfully!`, 'Close', {
            duration: 2000,
            verticalPosition: 'top'
          });
          this.registrationForm.reset();
          this.store.dispatch(employeeNull())
        }
      })
    ).subscribe();

    this.store.select(selectEmployeeError).pipe(
      tap(error => {
        if (error) {
          this.snackBar.open(`Failed to add employee: ${error}`, 'Close', {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
        this.store.dispatch(errorNull())
      })
    ).subscribe();

  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.openDialog = true;
      console.log(this.registrationForm.value);
    } else {
      alert('form not valid');
    }
  }

  onDialogConfirmed() {
    if (this.registrationForm.valid) {
      this.store.dispatch(
        addEmployee({ employee: this.registrationForm.value })
      );
      this.openDialog = false;
      // this.snackBar.open('Registration successful!', 'Close', {
      //   duration: 2000,
      //   verticalPosition: 'top',
      // });
      // this.registrationForm.reset();
    }
  }
  onDialogCancelled() {
    this.openDialog = false;
  }
}
