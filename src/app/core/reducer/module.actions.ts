import { Action } from "@ngrx/store";
import { OrdersFilterModel, ProductListFilterModel } from "./module.models";
import { OrderDetailModel } from "src/app/modules/shopping-cart/models/shopping-cart.model";

export enum ModulesActionsTypes {
  // modulo de retiro
  CatalogFilter = '[Catalog filter] Catalog filter',
  ClearCatalogFilter = '[Clear Catalog filter] Clear Catalog filter',

  // modulo de Ordenes
  OrdersFilter = '[Orders filter] Orders filter',
  ClearOrdersFilter = '[Clear Orders filter] Clear Orders filter',

  //reducer genereal
  ModulesFilterClear = '[Modules filterClear] Modules filterClear'
}

// Acciones del modulo de retiro
export class setCatalogFilter implements Action {
  readonly type = ModulesActionsTypes.CatalogFilter;

  constructor(public payload: { catalog: ProductListFilterModel }) {}
}
export class clearCatalogFilter implements Action {
  readonly type = ModulesActionsTypes.ClearCatalogFilter;

  constructor() {}
}


// Acciones del modulo de Ordenes
export class setOrdersFilter implements Action {
  readonly type = ModulesActionsTypes.OrdersFilter;

  constructor(public payload: { orders: OrdersFilterModel }) {}
}
export class clearOrdersFilter implements Action {
  readonly type = ModulesActionsTypes.ClearOrdersFilter;

  constructor() {}
}

// Acciones del reducer general
export class modulesFilterClear implements Action {
  readonly type = ModulesActionsTypes.ModulesFilterClear;

  constructor() {}
}

export type ModulesActions =  setCatalogFilter |
                              clearCatalogFilter |

                              setOrdersFilter |
                              clearOrdersFilter|

                              modulesFilterClear;
