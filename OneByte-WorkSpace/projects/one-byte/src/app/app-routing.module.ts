import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const EMPLOYEE_MANAGEMENT_URL= "http://localhost:4300/remoteEntry.js";

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => {
      return loadRemoteModule({
        remoteEntry:  EMPLOYEE_MANAGEMENT_URL,
        remoteName: "employeeManagement",
        exposedModule: "./EmployeeDashboardModule"
      }).then(m => m.EmployeeDashboardModule).catch(err => console.log(err));
    }
  },
  {path:'', redirectTo: '/login', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'home',component:HomeComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {};
