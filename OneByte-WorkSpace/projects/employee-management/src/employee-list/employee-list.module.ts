import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../app/state/employee.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('employees', employeeReducer),
    StoreModule.forRoot(employeeReducer),
  ],
})
export class EmployeeListModule {}
