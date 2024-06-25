import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmationComponent } from './confirmation.component';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from '../state/employee.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ConfirmationComponent
      }
    ]),
  ]
})
export class ConfirmationModule { }
