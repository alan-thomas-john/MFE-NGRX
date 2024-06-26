import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:4300';

  constructor(private http: HttpClient) {}

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/add`, employee);
  }

  deleteEmployee(emailId: string): Observable<{ emailId: string }> {
    return this.http.delete<{ emailId: string }>(`${this.apiUrl}/delete/${emailId}`);
  }
}
