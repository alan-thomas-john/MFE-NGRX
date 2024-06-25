import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public login(request: any) {
    return this.http.post("http://localhost:3000/auth/login", request, { responseType: 'json' })
    //  .subscribe({
    //   next:(response:any)=>{
    //     return response
    //   },
    //   error:(error:any)=>{
    //     console.log(error.error.message);
        
    //     return error.error.message
    //   }
    // }
      
    // );



  }

}
