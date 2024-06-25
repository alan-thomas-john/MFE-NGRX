import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../state/employee.reducer';
// import { RegistrationRoutingModule } from './registration-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forRoot(employeeReducer),

    // RouterModule.forChild([
    //   {path :'register',component:RegistrationComponent}
    // ])
    // RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
