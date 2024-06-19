import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  openDialog: boolean = false;


  constructor(private fb: FormBuilder,) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required]
    });
 }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.openDialog = true;
    }
    else {
      alert("form not valid");
    }
  }

  onDialogConfirmed() {
    if (this.registrationForm.valid)
      this.openDialog = false
    {
      this.registrationForm.reset
    }
  }

  onDialogCancelled() {
    this.openDialog = false
  }

}
