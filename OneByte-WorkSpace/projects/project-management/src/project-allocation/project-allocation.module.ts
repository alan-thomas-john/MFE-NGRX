import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAllocationComponent } from './project-allocation.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from 'projects/employee-management/src/app/state/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from 'projects/employee-management/src/app/state/employee.effects';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   // FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
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
