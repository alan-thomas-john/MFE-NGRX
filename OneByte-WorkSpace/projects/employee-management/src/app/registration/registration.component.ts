import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { EmployeeState } from '../state/employee.reducer';
import { addEmployee } from '../state/employee.actions';

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
    private store: Store<{ employees: EmployeeState }>
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      password: ['', Validators.required],
    });
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
      this.store.dispatch(addEmployee({ employee: this.registrationForm.value }));
      this.openDialog = false;
      this.registrationForm.reset();
      alert('registertion succesfull');
    }
  }

  onDialogCancelled() {
    this.openDialog = false;
    alert('something went wrong');
  }
}
