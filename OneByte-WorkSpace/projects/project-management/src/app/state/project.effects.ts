import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addProject,
  addProjectFailure,
  addProjectSuccess,
  assignProjectToUsers,
  assignProjectToUsersFailure,
  assignProjectToUsersSuccess,
  loadProjects,
  loadProjectsFailure,
  loadProjectsSuccess,
} from './project.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { ProjectService } from './project.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    // private toaster: ToastModule,
    private messageService: MessageService
  ) {}

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProject),
      mergeMap((action) =>
        this.projectService.addProject(action.project).pipe(
          map((project) => addProjectSuccess({ project })),
          catchError((error) => of(addProjectFailure({ error })))
        )
      )
    )
  );

  //
  loadProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjects),
      mergeMap(() =>
        this.projectService.getProjects().pipe(
          map((projects) => loadProjectsSuccess({ projects })),
          catchError((error) => of(loadProjectsFailure({ error })))
        )
      )
    )
  );

  assignProjectToUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(assignProjectToUsers),
      mergeMap((action) =>
        this.projectService
          .assignProjectToUsers(action.projectId, action.userIds)
          .pipe(
            map((project) => assignProjectToUsersSuccess({ project })), // Pass the project payload
            catchError((error) => of(assignProjectToUsersFailure({ error })))
          )
      )
    )
  );

  assignProjectToUsersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(assignProjectToUsersSuccess),
        tap(() => {
          this.showToast1();
        })
      ),
    { dispatch: false }
  );

  assignProjectToUsersFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(assignProjectToUsersFailure),
        tap(() => {
          this.showToast2();
        })
      ),
    { dispatch: false }
  );

  showToast1() {
    this.messageService.clear();
    this.messageService.add({
      key: 'toast1',
      severity: 'success',
      summary: 'Success',
      detail: 'Project assigned successfully',

    });
  }
  showToast2() {
    this.messageService.clear();
    this.messageService.add({
      key: 'toast2',
      severity: 'warn',
      summary: 'Warning',
      detail: 'Error assigning project',


    });
  }
  showError(error: any) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error.error.message,
    });
  }
}
