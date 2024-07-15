import { ModulesActions, ModulesActionsTypes } from "./module.actions";
import { CatalogFilterModel, OrdersFilterModel } from './module.models';
export interface ModulesState {
  filters: {
    catalog: CatalogFilterModel,
    orders: OrdersFilterModel,
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

export const initialOrdersFilterModel: OrdersFilterModel = {
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

export const initialModuleFilter: ModulesState = {
  filters: {
    catalog: initialCatalogFilterModel,
    orders: initialOrdersFilterModel,
  }
}

export function ModulesReducer(
  state = initialModuleFilter,
  action: ModulesActions
) {
  switch (action.type) {

    // Acciones de catalogo de productos
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

    // Acciones de Orderso
    case ModulesActionsTypes.OrdersFilter:
      return {
        filters: {
          ...state.filters,
          orders: action.payload.orders
        }
      }
    case ModulesActionsTypes.ClearOrdersFilter:
      return {
        filters: {
          ...state.filters,
          orders: initialOrdersFilterModel
        }
      }

    // Accion General
    case ModulesActionsTypes.ModulesFilterClear:
      return {
        filters: {
          orders: initialOrdersFilterModel,
          catalog: initialCatalogFilterModel
        }
      }

    default:
      return state;
  }
}
