export interface CatalogFilterModel {
  limit: string;
  page: string;
  search: string;
  stockStart: string;
  stockEnd: string;
  amountStart: string;
  amountEnd: string;
  idStatus: string;
  visibility: boolean;
}

export interface OrdersFilterModel {
  limit: string;
  page: string;
  search: string;
  stockStart: string;
  stockEnd: string;
  amountStart: string;
  amountEnd: string;
  idStatus: string;
  visibility: boolean;
}

export interface DepositFilterModel {
  limit: string;
  page: string;
  search: string;
  startDate: any;
  endDate: any;
  amountStart: string;
  amountEnd: string;
  idDepositStatus: string;
  idDepositCurrency: string;
}
