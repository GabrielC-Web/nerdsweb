import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ModulesState } from "./module.reducers";

export const SelectModulesState = createFeatureSelector<ModulesState>("Modules");

export const catalogFilter = createSelector(
  SelectModulesState,
  ModulesState => ModulesState.filters.catalog
)

export const depositFilter = createSelector(
  SelectModulesState,
  ModulesState => ModulesState.filters.deposit
)
