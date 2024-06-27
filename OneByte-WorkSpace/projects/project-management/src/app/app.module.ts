import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { projectReducer } from './state/project.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './state/project.effects';
import { ProjectService } from './state/project.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectDashboardModule } from './project-dashboard/project-dashboard.module';


@NgModule({
  declarations: [
    AppComponent,
    // ConfirmationComponent,
    // ProjectListComponent,
    // ProjectAllocationComponent,
    // ProjectDashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ProjectDashboardModule,
    StoreModule.forRoot({ project: projectReducer }),
    StoreModule.forRoot({ projectState: projectReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([ProjectEffects]),
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
