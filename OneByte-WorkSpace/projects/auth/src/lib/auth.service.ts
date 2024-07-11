import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private apiUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient) { }

  public login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post("http://localhost:3000/auth/login", credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('authToken');
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}




