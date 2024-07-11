import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthService, AuthState, login, logout, selectAuthToken } from 'projects/auth/src/public-api';
import { select, Store } from '@ngrx/store';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


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
    // private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private toaster: ToastModule,
    private messageService: MessageService,
    private store: Store<{ auth: AuthState }>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.token$.subscribe(token => {
      if (token) {
        this.showToast1();
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
      this.showToast2();
    }
  }
  showToast1() {
    this.messageService.clear();
    this.messageService.add({
      key: 'toast1',
      severity: 'success',
      summary: 'Success',
      detail: 'Login successful',
    });
  }
  showError(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.error.message,
    });
  }
  showToast2() {
    this.messageService.clear();
    this.messageService.add({
      key: 'toast2',
      severity: 'warn',
      summary: 'Warning',
      detail: 'something went wrong',
    });
  }
 
}
