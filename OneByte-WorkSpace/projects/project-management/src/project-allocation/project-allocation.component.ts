import { Component, OnInit } from '@angular/core';
import { Employee } from 'projects/employee-management/src/app/state/employee.model';
import { Observable } from 'rxjs';
import { Project } from '../app/state/project.model';
import { Store, select } from '@ngrx/store';
import { ProjectState } from '../app/state/project.reducer';
import { EmployeeState } from 'projects/employee-management/src/app/state/employee.reducer';
import { loadEmployees, setEmployees } from 'projects/employee-management/src/app/state/employee.actions';
import { selectAllEmployees, selectEmployee } from 'projects/employee-management/src/app/state/employee.selectors';
import { assignProjectToUsers, loadProjects, loadProjectsSuccess } from '../app/state/project.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectAllProjects } from '../app/state/project.selectors';
import { EmployeeService } from 'projects/employee-management/src/app/state/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService } from '../app/state/project.service';

@Component({
  selector: 'app-project-allocation',
  templateUrl: './project-allocation.component.html',
  styleUrls: ['./project-allocation.component.css']
})
export class ProjectAllocationComponent implements OnInit{

  projects$: Observable<Project[]>;
  employees$: Observable<Employee[]>;
  form!: FormGroup;
  isEmpty: boolean = true;
  

  selectedProjectId: number | null = null;
  selectedEmployeeIds: number[] = [];

  // constructor(private store: Store<{ project: ProjectState; employee: EmployeeState }>) {
  //   this.projects$ = this.store.select(state => state.project.projects);
  //   this.employees$ = this.store.select(state => state.employee.employees);
  // }
  constructor( private snackbar:MatSnackBar,private projectService: ProjectService,private snackBar: MatSnackBar,private fb: FormBuilder,private employeeService:EmployeeService, private store: Store<{ project: ProjectState; employee: EmployeeState }>) {
    this.form = this.fb.group({
      projectId: [null, Validators.required],
      userIds: [[], Validators.required]
    });
    this.projects$ = this.store.select(selectAllProjects);
    this.employees$ = this.store.select(selectAllEmployees);

    
    
  }

 

  ngOnInit() {
    this.loadInitialProjects();
    //this.employees$ = this.store.pipe(select(selectAllEmployees));
    this.employees$.subscribe((employees) => {
      console.log('Employees in component:', employees);
      if (employees.length == 0) {
        this.employeeService.getAllEmployees().subscribe({
          next: (employees: Employee[]) => {
            console.log('Fetched employees from backend:', employees);
            //this.isEmpty = employees.length === 0;
            this.store.dispatch(setEmployees({ employees }));
            this.employees$ = this.store.pipe(select(selectAllEmployees));
            console.log('employees from the store', this.employees$);
          },
          error: (error) => {
            console.error('Error fetching employees:', error);
            this.snackBar.open('Error fetching employees', 'Close', {
              duration: 3000,
              verticalPosition: 'top', // Position the snackbar at the top
            });
          },
        });
      }
    });

    this.store.select(state => state.project).subscribe(state => {
      if (state.error) {
        this.snackBar.open('Error assigning project', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } else if (state.projects.length) {
        this.snackBar.open('Project assigned successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    });
  }


  loadInitialProjects() {
    this.projectService.getProjects().subscribe({
      next: (projects) =>  {
        console.log('loaded project',projects)
        this.store.dispatch(loadProjectsSuccess
          ({ projects }));
      },
      error: (error) => {
        console.error('Error loading projects', error);
      }
    }  
    );
  }

  assignEmployees(): void {
    if (this.form.valid) {
      const { projectId, userIds } = this.form.value;
      this.store.dispatch(assignProjectToUsers({ projectId, userIds }));
    }
  }

}
