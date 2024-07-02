import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardComponent } from './project-dashboard.component';
import { RouterModule } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app/app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProjectEffects } from '../app/state/project.effects';
import { projectReducer } from '../app/state/project.reducer';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@NgModule({
  declarations: [
    ConfirmationComponent,
    AddProjectComponent,
    ProjectDashboardComponent,
    ProjectListComponent,
  ],
  imports: [
    CommonModule,
    //BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //AppRoutingModule,
    RouterModule.forChild([
      { path: '', component: ProjectDashboardComponent },
      { path: 'add', component: AddProjectComponent },
      { path: 'list', component: ProjectListComponent },
    ]),
    //StoreModule.forRoot({ projectState: projectReducer }),
    StoreModule.forFeature('project', projectReducer),
    EffectsModule.forFeature([ProjectEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: isDevMode() }),
  ],
  exports: [ProjectDashboardComponent],
})
export class ProjectDashboardModule {}
