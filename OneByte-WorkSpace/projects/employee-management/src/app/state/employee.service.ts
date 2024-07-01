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
    return this.http.post<Employee>(`${this.apiUrl}register`, employee);
  }

  // viewEmployee(employee: Employee): Observable<Employee> {
  //   return this.http.get<Employee>(`${this.apiUrl}employeelist/${employee.id}`);
  // }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}users`);
  }

  deleteEmployee(): Observable<{id: number}> {
    return this.http.delete<{ id: number }>(`${this.apiUrl}user`,);
  }
}
