import { ProjectState, projectReducer } from './../../../project-management/src/app/state/project.reducer';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from 'projects/employee-management/src/app/state/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from 'projects/employee-management/src/app/state/employee.effects';
import { authInterceptor, authReducer } from 'projects/auth/src/public-api';
import { AuthEffects } from 'projects/auth/src/lib/auth.effects';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProjectEffects } from 'projects/project-management/src/app/state/project.effects';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // HttpClientModule,
    // EmployeeDashboardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastModule,
   // StoreModule.forRoot(employeeReducer),
    //EffectsModule.forRoot([]),
    //StoreModule.forFeature('employees', employeeReducer),
    StoreModule.forRoot({ employees: employeeReducer, projectState: projectReducer, auth: authReducer}),
    //StoreModule.forRoot({ ProjectState:projectReducer }),
    EffectsModule.forRoot([]),
    EffectsModule.forRoot([ProjectEffects,EmployeeEffects,AuthEffects]),
   //EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor,multi: true},
  MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
