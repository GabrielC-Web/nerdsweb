import { ModulesActions, ModulesActionsTypes } from "./module.actions";
import { ProductListFilterModel, OrdersFilterModel } from './module.models';
export interface ModulesState {
  filters: {
    catalog: ProductListFilterModel,
    orders: OrdersFilterModel,
  };
}

export const initialProductListFilterModel: ProductListFilterModel = {
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
    catalog: initialProductListFilterModel,
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
          catalog: initialProductListFilterModel
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
          catalog: initialProductListFilterModel
        }
      }

    default:
      return state;
  }
}
