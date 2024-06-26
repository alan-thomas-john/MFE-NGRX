import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../app/state/employee.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('employees', employeeReducer),
    StoreModule.forRoot(employeeReducer),
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: EmployeeListComponent,
    //   },
    // ]),
  ],
})
export class EmployeeListModule {}
