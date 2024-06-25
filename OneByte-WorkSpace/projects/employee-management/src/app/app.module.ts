import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDashboardModule } from './employee-dashboard/employee-dashboard.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from './state/employee.reducer';
// import { EmployeeDashboardRoutingModule } from './employee-dashboard/employee-dashboard-routing.module';
// import { RegistrationRoutingModule } from './registration/registration-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // EmployeeDashboardRoutingModule,
    // RegistrationRoutingModule,
    FormsModule,
    StoreModule.forRoot(employeeReducer),
    ReactiveFormsModule,
    EmployeeDashboardModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forFeature('employees', employeeReducer)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
