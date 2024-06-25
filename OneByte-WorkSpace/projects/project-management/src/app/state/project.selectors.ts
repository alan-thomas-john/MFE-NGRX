import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProjectState } from "./project.reducer";

export const selectProjectState = createFeatureSelector<ProjectState>('projectState');

export const selectAllProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state.projects
);