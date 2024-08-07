import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent {

  constructor(private router:Router){}

  navigateToAddProject(){
    this.router.navigate(['projectdashboard/add'])
  }
  navigateToProjectList(){
    this.router.navigate(['projectdashboard/list'])
  }
  navigateToProjectAllocation(){
    this.router.navigate(['projectdashboard/allocation'])
  }
}
