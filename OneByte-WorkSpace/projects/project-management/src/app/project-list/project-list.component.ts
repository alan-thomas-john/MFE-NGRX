import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../state/project.model';
import { Store } from '@ngrx/store';
import { ProjectState } from '../state/project.reducer';
import { selectAllProjects } from '../state/project.selectors';
import { deleteProject, loadProjects, loadProjectsSuccess } from '../state/project.actions';
import { ProjectService } from '../state/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(private store: Store<ProjectState>,private projectService: ProjectService) {
    this.projects$ = this.store.select(selectAllProjects);
  }
  ngOnInit(): void {
    this.loadInitialProjects();
  }

  loadInitialProjects() {
    this.projectService.getProjects().subscribe({
      next: (projects) =>  {
        this.store.dispatch(loadProjectsSuccess({ projects }));
      },
      error: (error) => {
        console.error('Error loading projects', error);
      }
    }  
    );
  }


  deleteProject(projectName: string) {
    this.store.dispatch(deleteProject({projectName}));
  }


}
