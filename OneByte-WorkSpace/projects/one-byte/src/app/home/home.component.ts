import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'projects/auth/src/public-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor(private router: Router,private store: Store){}

  onLogout(){
     console.log('Logout button clicked');
     this.store.dispatch(logout());
     localStorage.removeItem('authToken');
     this.router.navigate(['login']);
   }

}
