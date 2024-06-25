import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../state/project.model';
import { Store } from '@ngrx/store';
import { ProjectState } from '../state/project.reducer';
import { selectAllProjects } from '../state/project.selectors';
import { deleteProject } from '../state/project.actions';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(private store: Store<ProjectState>) {
    this.projects$ = this.store.select(selectAllProjects);
  }
  ngOnInit(): void {
    
  }

  deleteProject(projectName: string) {
    this.store.dispatch(deleteProject({projectName}));
  }


}
