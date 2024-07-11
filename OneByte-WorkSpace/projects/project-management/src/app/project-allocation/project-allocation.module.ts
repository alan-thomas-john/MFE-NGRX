import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  ReactiveFormsModule } from '@angular/forms';

import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // StoreModule.forFeature('employees', employeeReducer),
    // EffectsModule.forFeature([EmployeeEffects]),
    //FormsModule,
    ReactiveFormsModule,
    ToastModule,
    // StoreModule.forFeature('employee',employeeReducer),
    // EffectsModule.forFeature([EmployeeEffects])
    // RouterModule.forChild([
    //   {
    //     path:'',
    //     component:ProjectAllocationComponent
    //   }
    // ]),
  ]
})
export class ProjectAllocationModule { }
