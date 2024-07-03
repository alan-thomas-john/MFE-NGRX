import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addProject, addProjectFailure, addProjectSuccess, loadProjects, loadProjectsFailure, loadProjectsSuccess } from "./project.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { ProjectService } from "./project.service";
import { Project } from "./project.model";

@Injectable()
export class ProjectEffects {

  constructor(
    private actions$: Actions, private projectService: ProjectService
  ) { }

  // loadProjects$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadProjects),
  //     mergeMap(() =>
  //       this.projectService.getProjects().pipe(
  //         map(projects => loadProjectsSuccess({ projects })),
  //         catchError(error => of(loadProjectsFailure({ error })))
  //       )
  //     )
  //   )
  // );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProject),
      mergeMap(action =>
        this.projectService.addProject(action.project).pipe(
          map(project => addProjectSuccess({ project })),
          catchError(error => of(addProjectFailure({ error })))
        )
      )
    )
  );

  

}