import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ModulesState } from "./module.reducers";

export const SelectModulesState = createFeatureSelector<ModulesState>("Modules");

export const catalogFilter = createSelector(
  SelectModulesState,
  ModulesState => ModulesState.filters.catalog
)

export const ordersFilter = createSelector(
  SelectModulesState,
  ModulesState => ModulesState.filters.orders
)
