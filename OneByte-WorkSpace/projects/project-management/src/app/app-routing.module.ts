import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAllocationComponent } from './project-allocation/project-allocation.component';

const routes: Routes = [
  { path: '', redirectTo: '/projectdashboard', pathMatch: 'full' },
  { path: 'projectdashboard', component: ProjectDashboardComponent },
  { path: 'projectdashboard/add', component: AddProjectComponent },
  { path: 'projectdashboard/list', component: ProjectListComponent },
  { path: 'projectdashboard/allocation', component: ProjectAllocationComponent },


];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
