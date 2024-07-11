import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDashboardModule } from './employee-dashboard/employee-dashboard.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from './state/employee.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EmployeeModule } from './state/employee.module';
import { EffectsModule, EffectsRootModule } from '@ngrx/effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeEffects } from './state/employee.effects';
import { CommonModule } from '@angular/common';
import { authInterceptor, authReducer } from 'projects/auth/src/public-api';
import { AuthEffects } from 'projects/auth/src/lib/auth.effects';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
// import { EmployeeDashboardRoutingModule } from './employee-dashboard/employee-dashboard-routing.module';
// import { RegistrationRoutingModule } from './registration/registration-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ employees: employeeReducer }),
    EffectsModule.forRoot([EmployeeEffects]),
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forFeature('employees', employeeReducer),
    ToastModule,
    ReactiveFormsModule,
    HttpClientModule,
    EmployeeDashboardModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EmployeeModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true},
  MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
