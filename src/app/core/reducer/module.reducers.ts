import { ModulesActions, ModulesActionsTypes } from "./module.actions";
import { DepositFilterModel, CatalogFilterModel } from './module.models';
export interface ModulesState {
  filters: {
    catalog: CatalogFilterModel,
    deposit: DepositFilterModel,
  };
}

export const initialCatalogFilterModel: CatalogFilterModel = {
  limit: '10',
  page: '0',
  search: '',
  stockStart: '',
  stockEnd: '',
  amountStart: '',
  amountEnd: '',
  idStatus: '',
  visibility: false,
};

export const initialDepositFilter: DepositFilterModel = {
  limit: '10',
  page: '0',
  search: '',
  startDate: '',
  endDate: '',
  amountStart: '',
  amountEnd: '',
  idDepositStatus: '',
  idDepositCurrency: '',
};

export const initialModuleFilter: ModulesState = {
  filters: {
    catalog: initialCatalogFilterModel,
    deposit: initialDepositFilter,
  }
}

export function ModulesReducer(
  state = initialModuleFilter,
  action: ModulesActions
) {
  switch (action.type) {

    // Acciones de retiro
    case ModulesActionsTypes.CatalogFilter:
      return {
        filters: {
          ...state.filters,
          catalog: action.payload.catalog
        }
      }
    case ModulesActionsTypes.ClearCatalogFilter:
      return {
        filters: {
          ...state.filters,
          catalog: initialCatalogFilterModel
        }
      }

    // Acciones de deposito
    case ModulesActionsTypes.DepositFilter:
      return {
        filters: {
          ...state.filters,
          deposit: action.payload.deposit
        }
      }
    case ModulesActionsTypes.ClearDepositwFilter:
      return {
        filters: {
          ...state.filters,
          deposit: initialDepositFilter
        }
      }

    // Accion General
    case ModulesActionsTypes.ModulesFilterClear:
      return {
        filters: {
          deposit: initialDepositFilter,
          catalog: initialCatalogFilterModel
        }
      }

    default:
      return state;
  }
}
