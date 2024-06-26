import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/auth/';

  constructor(private http: HttpClient) {}

  addEmployee(employee: Employee): Observable<Employee> {
    console.log("fai")
    return this.http.post<Employee>(`${this.apiUrl}register`, employee);


  }

  deleteEmployee(emailId: string): Observable<{ emailId: string }> {
    return this.http.delete<{ emailId: string }>(`${this.apiUrl}/delete/${emailId}`);
  }
}
