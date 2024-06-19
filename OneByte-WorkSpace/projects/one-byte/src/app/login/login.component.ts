import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,private router:Router) {
    this.LoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.LoginForm.valid) {
      console.log(this.LoginForm.value);
      this.snackBar.open('Login successful!', 'Close', {
        duration: 500,
      });
      this.router.navigate(["/home"])
    } else {
      this.snackBar.open('Form not  valid', 'Close', {
        duration: 2000,
      });
    }
  }
}
