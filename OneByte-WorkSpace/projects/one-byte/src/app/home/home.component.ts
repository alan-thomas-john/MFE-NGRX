import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router){}

  onLogout(){
    console.log('Logout button clicked'); 
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
