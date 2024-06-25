import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { RegistrationComponent } from '../registration/registration.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
// import { EmployeeDashboardRoutingModule } from './employee-dashboard-routing.module';
// import { RegistrationRoutingModule } from '../registration/registration-routing.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../state/employee.reducer';



@NgModule({
  declarations: [
    ConfirmationComponent,
    RegistrationComponent,
    EmployeeListComponent,
    EmployeeDashboardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    // EmployeeDashboardRoutingModule,
    // RegistrationRoutingModule,
    RouterModule.forChild([
      { path:'', component:EmployeeDashboardComponent },
      {path:'register',component:RegistrationComponent},
      {path:'list',component:EmployeeListComponent},

    ]),
    StoreModule.forRoot(employeeReducer),
    StoreModule.forFeature('employees', employeeReducer)

  ],
  // exports:[EmployeeDashboardRoutingModule,RegistrationRoutingModule]

})
export class EmployeeDashboardModule {
  // static forRoot: any;
}
