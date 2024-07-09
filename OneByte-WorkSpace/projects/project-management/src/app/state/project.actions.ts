import { createAction, props } from "@ngrx/store";
import { Project } from "./project.model";

export const addProject = createAction(
    '[Project] Add Project',
    props<{ project: Project }>()
  );

  export const addProjectSuccess = createAction(
    '[Project] Add Project Success',
    props<{ project: Project }>()
  );
  
  export const addProjectFailure = createAction(
    '[Project] Add Project Failure',
    props<{ error: any }>()
  );

export const loadProjects = createAction('[Project] Load Projects');

export const loadProjectsSuccess = createAction(
  '[Project] Load Projects Success',
  props<{ projects: Project[] }>()
);

export const loadProjectsFailure = createAction(
  '[Project] Load Projects Failure',
  props<{ error: any }>()
);

export const deleteProject = createAction(
  '[Project] Delete Project',
  props<{ projectName: string }>()
);

///
export const assignProjectToUsers = createAction(
  '[Project] Assign Project To Users',
  props<{ projectId: number; userIds: number[] }>()
);

export const assignProjectToUsersSuccess = createAction(
  '[Project] Assign Project to Users Success',
  props<{ project: Project }>() 
);

export const assignProjectToUsersFailure = createAction(
  '[Project] Assign Project To Users Failure',
  props<{ error: any }>()
);
