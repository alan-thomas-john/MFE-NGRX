import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../app/state/employee.reducer';
import { EmployeeEffects } from '../app/state/employee.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('employees', employeeReducer),
    EffectsModule.forFeature([EmployeeEffects]),
    //StoreModule.forRoot(employeeReducer),
  ],
})
export class EmployeeListModule {}
