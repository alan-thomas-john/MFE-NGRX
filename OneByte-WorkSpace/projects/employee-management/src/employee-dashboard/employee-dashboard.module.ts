import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { RegistrationComponent } from '../registration/registration.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../app/state/employee.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from '../app/state/employee.effects';

@NgModule({
  declarations: [
    ConfirmationComponent,
    RegistrationComponent,
    EmployeeListComponent,
    EmployeeDashboardComponent,
  ],
  imports: [
    CommonModule,
   // BrowserModule,//this caused routing issue
    MatSnackBarModule,
    ReactiveFormsModule,
    //RouterOutlet,
    // EmployeeDashboardRoutingModule,
    // RegistrationRoutingModule,
    RouterModule.forChild([
      { path: '', component: EmployeeDashboardComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'list', component: EmployeeListComponent },
    ]),

    
    StoreModule.forFeature('employee',employeeReducer),
    EffectsModule.forFeature([EmployeeEffects]),
    //StoreModule.forFeature('employees',employeeReducer),
    // EffectsModule.forRoot([EmployeeEffects])

  ],

  exports: [],
})
export class EmployeeDashboardModule {}
