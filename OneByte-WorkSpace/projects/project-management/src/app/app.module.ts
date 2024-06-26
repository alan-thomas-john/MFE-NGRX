import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectAllocationComponent } from './project-allocation/project-allocation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectDashboardModule } from './project-dashboard/project-dashboard.module';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from './state/project.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './state/project.effects';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    ConfirmationComponent,
    ProjectListComponent,
    ProjectAllocationComponent,
    ProjectDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ProjectDashboardModule,
    StoreModule.forRoot({ project: projectReducer }),
    StoreModule.forRoot({ projectState: projectReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([ProjectEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
