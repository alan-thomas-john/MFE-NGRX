import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectAllocationComponent } from './project-allocation.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'',
        component:ProjectAllocationComponent
      }
    ]),
  ]
})
export class ProjectAllocationModule { }
