import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthState, login, logout, selectAuthToken } from 'projects/auth/src/public-api';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token$ = this.store.pipe(select(selectAuthToken));


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Subscribe to the token$ observable to check for successful login
    this.token$.subscribe(token => {
      if (token) {
        this.snackBar.open('Login successful!', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/home']);
      }
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Form is valid, dispatching login action:', { email, password });
      this.store.dispatch(login({ email, password }));
    } else {
      this.snackBar.open('Form not valid', 'Close', {
        duration: 2000,
        panelClass: ['my-custom-snackbar'],
      });
    }
  }
  onLogout() {
    this.store.dispatch(logout());
  }
}
