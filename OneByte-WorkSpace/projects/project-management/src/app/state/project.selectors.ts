import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectState } from "./project.reducer";

export const selectProjectState = createFeatureSelector<ProjectState>('projectState');

export const selectAllProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state.projects
);

export const selectAddProjectError = createSelector(
  selectProjectState,
  (state: ProjectState) => state.error
);

export const selectAddProjectSuccess = createSelector(
  selectProjectState,
  (state: ProjectState) => {
    if (state.projects.length > 0) {
      return state.projects[state.projects.length - 1];
    }
    return null;
  }
);