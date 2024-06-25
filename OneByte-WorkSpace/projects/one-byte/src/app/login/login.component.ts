import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar,private router:Router,private authService:AuthenticationService) {
    this.loginForm = this.fb.group({
      email: ['',[ Validators.required,Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          this.snackBar.open('Login successful!', 'Close', {
            duration: 2000,
          });
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          console.error('Login failed', error.error.message);
          this.snackBar.open(error.error.message, 'Close', {
            duration: 2000,
          });
        },
      });
    } else {
      this.snackBar.open('Form not valid', 'Close', {
        duration: 2000,
      });
    }
  }
}
