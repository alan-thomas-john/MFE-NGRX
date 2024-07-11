import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from '../state/employee.model';
import { Project } from '../state/project.model';
import { ProjectState } from '../state/project.reducer';
import { EmployeeState } from '../state/employee.reducer';
import { loadEmployees } from '../state/employee.action';
import { selectAllEmployees } from '../state/employee.selector';
import { assignProjectToUsers, loadProjects } from '../state/project.actions';
import { selectAllProjects } from '../state/project.selectors';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-allocation',
  templateUrl: './project-allocation.component.html',
  styleUrls: ['./project-allocation.component.css'],
  // providers: [MessageService],
})
export class ProjectAllocationComponent implements OnInit {
  projects$: Observable<Project[]>;
  employees$: Observable<Employee[]>;
  form: FormGroup;

  constructor(

    private toaster: ToastModule,
    private messageService: MessageService,
    private fb: FormBuilder,
    private store: Store<{ project: ProjectState; employee: EmployeeState }>
  ) {
    this.form = this.fb.group({
      projectId: [null, Validators.required],
      userIds: [[], Validators.required],
    });
    this.projects$ = this.store.pipe(select(selectAllProjects));
    this.employees$ = this.store.pipe(select(selectAllEmployees));
  }

  ngOnInit() {
    this.store.dispatch(loadEmployees());
    this.store.dispatch(loadProjects());
  }

  assignEmployees(): void {
    if (this.form.valid) {
      const { projectId, userIds } = this.form.value;
      this.store.dispatch(assignProjectToUsers({ projectId, userIds }));
      console.log("project assigned successfully")

  }

}
}
