import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from '../employee-dashboard/employee-dashboard.component';
import { RegistrationComponent } from '../registration/registration.component';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from '../employee-list/employee-list.component';

const routes: Routes = [
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  // {path:'register', component: EmployeeDashboardComponent},
   {path:'dashboard', component: EmployeeDashboardComponent},
  {path:'dashboard/register', component: RegistrationComponent},
  {path:'dashboard/list', component: EmployeeListComponent},
   //{path:'register',component:RegistrationComponent},

];
@NgModule({
  imports: [
    CommonModule,//caused routing issue
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
