// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { addProject, addProjectFailure, addProjectSuccess } from "./project.actions";
// import { catchError, map, mergeMap, of } from "rxjs";
// import { Project } from "./project.model";
// import { ProjectService } from "../project.service";

// @Injectable()
// export class ProjectEffects {
//   addProject$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(addProject),
//       mergeMap(action =>
//         this.projectService.addProject(action.project).pipe(
//           map((project: Project) => addProjectSuccess({ project })),
//           catchError(error => of(addProjectFailure({ error })))
//         )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private projectService: ProjectService
//   ) {}
// }