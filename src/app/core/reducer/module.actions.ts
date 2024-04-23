import { Action } from "@ngrx/store";
import { DepositFilterModel, CatalogFilterModel } from "./module.models";

export enum ModulesActionsTypes {
  // modulo de retiro
  CatalogFilter = '[Catalog filter] Catalog filter',
  ClearCatalogFilter = '[Clear Catalog filter] Clear Catalog filter',

  // modulo de deposito
  DepositFilter = '[Deposit filter] Deposit filter',
  ClearDepositwFilter = '[Clear deposit filter] Clear deposit filter',

  //reducer genereal
  ModulesFilterClear = '[Modules filterClear] Modules filterClear'
}

// Acciones del modulo de retiro
export class setCatalogFilter implements Action {
  readonly type = ModulesActionsTypes.CatalogFilter;

  constructor(public payload: { catalog: CatalogFilterModel }) {}
}
export class clearCatalogFilter implements Action {
  readonly type = ModulesActionsTypes.ClearCatalogFilter;

  constructor() {}
}


// Acciones del modulo de deposito
export class setDepositFilter implements Action {
  readonly type = ModulesActionsTypes.DepositFilter;

  constructor(public payload: { deposit: DepositFilterModel }) {}
}
export class clearDepositFilter implements Action {
  readonly type = ModulesActionsTypes.ClearDepositwFilter;

  constructor() {}
}

// Acciones del reducer general
export class modulesFilterClear implements Action {
  readonly type = ModulesActionsTypes.ModulesFilterClear;

  constructor() {}
}

export type ModulesActions =  setCatalogFilter |
                              clearCatalogFilter |

                              setDepositFilter |
                              clearDepositFilter|

                              modulesFilterClear;
