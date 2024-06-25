import { createReducer, on } from "@ngrx/store";
import { Project } from "./project.model";
import { addProject, addProjectFailure, addProjectSuccess, deleteProject, loadProjectsFailure, loadProjectsSuccess } from "./project.actions";

export interface ProjectState {
  projects: Project[];
}

export const initialState: ProjectState = {
  projects: []
};

export const projectReducer = createReducer(
  initialState,

  on(addProject, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project]
  })),

  on(addProjectSuccess, (state, { project }) => ({
    ...state,
    projects: [...state.projects, project]
  })),
  on(addProjectFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(loadProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects
  })),

  on(loadProjectsFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(deleteProject, (state, { projectName }) => ({
    ...state,
    projects: state.projects.filter(project => project.name !== projectName)
  }))
);