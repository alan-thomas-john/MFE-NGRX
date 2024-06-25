import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard.component';
import { RouterModule } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectListComponent } from '../project-list/project-list.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:ProjectDashboardComponent}, 
      {path:'add',component:AddProjectComponent},
      {path:'list',component:ProjectListComponent},
    ]),
  ]
})
export class ProjectDashboardModule { }
