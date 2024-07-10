import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {

  constructor(private router:Router){}

  navigateToRegistration(){
    this.router.navigate(['employeedashboard/register']);

  }
  navigateToEmployeeList(){
    this.router.navigate(['employeedashboard/list']);

  }

}
