import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthenticationService,
    private toaster: ToastModule,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          // console.log('Login successful', response);
          // this.snackBar.open('Login successful!', 'Close', {
          //   duration: 2000,
          // });
          this.showToast1();
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          console.error('Login failed', error.error.message);
          // this.snackBar.open(error.error.message, 'Close', {
          //   duration: 2000,
          //   horizontalPosition: 'right', // 'start', 'center', 'end', 'left', 'right'
          //   verticalPosition: 'top',
          // });
          this.showError(error);
        },
      });
    } else {
      this.showToast2();
      // this.snackBar.open('Form not valid', 'Close', {
      //   duration: 2000,
      //   panelClass: ['my-custom-snackbar'],
      // });
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
