import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  // {path:'dashboard/register', component: EmployeeDashboardComponent},
  // {path:'register', component: EmployeeDashboardComponent},
   {path:'dashboard', component: EmployeeDashboardComponent},
  //  {path:'register',component:RegistrationComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
