import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard.component';
import { RouterModule } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProjectEffects } from '../state/project.effects';
import { projectReducer } from '../state/project.reducer';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { ProjectAllocationComponent } from '../project-allocation/project-allocation.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { employeeReducer } from '../state/employee.reducer';
import { EmployeeEffects } from '../state/employee.effects';

@NgModule({
  declarations: [
    ConfirmationComponent,
    AddProjectComponent,
    ProjectDashboardComponent,
    ProjectListComponent,
    ProjectAllocationComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    //BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //AppRoutingModule,
    RouterModule.forChild([
      { path: '', component: ProjectDashboardComponent },
      { path: 'add', component: AddProjectComponent },
      { path: 'list', component: ProjectListComponent },
      { path: 'allocation', component: ProjectAllocationComponent },
    ]),
    //StoreModule.forRoot({ projectState: projectReducer }),
    StoreModule.forFeature('project', projectReducer),
    EffectsModule.forFeature([ProjectEffects]),
    StoreModule.forFeature('employees', employeeReducer),
    EffectsModule.forFeature([EmployeeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: isDevMode() }),
  ],
  exports: [ProjectDashboardComponent],
})
export class ProjectDashboardModule {}
