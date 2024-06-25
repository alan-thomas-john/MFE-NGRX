import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../state/employee.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('employees', employeeReducer)
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: EmployeeListComponent,
    //   },
    // ]),
  ],
})
export class EmployeeListModule {}
