import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CmmComponentTableModel, CmmStatusTypeGroupsModel, CmmTableColumnErrorMsg, CmmTableHeader, CmmTableRow } from 'src/app/common/data/tables/models/tables.model';
import { OrdersFilterModel } from 'src/app/core/reducer/module.models';
import { FilterObjectModel } from 'src/app/core/shared/models/filter-form.model';
import { DashboardService } from '../../services/dashboard.service';
import { CmmDataService } from 'src/app/common/services/data.service';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ordersFilter } from 'src/app/core/reducer/module.selectors';
import { clearOrdersFilter, setOrdersFilter } from 'src/app/core/reducer/module.actions';
import { OrderDetailModel } from 'src/app/modules/shopping-cart/models/shopping-cart.model';
import { OrderStatus } from '../../models/orders.model';

@Component({
  selector: 'pag-dashboard-orders',
  templateUrl: './dashboard-orders.component.html',
  styleUrls: ['./dashboard-orders.component.scss']
})
export class DashboardOrdersComponent implements CmmComponentTableModel {

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> = new Subject();

  /**
   * Headers de la tabla
   */
  header: CmmTableHeader[]= [
    {
      text: 'Orden',
      action: false,
      field: 'idOrder',
      cssClass: 'text-center',
    },
    {
      text: 'Creado',
      action: false,
      field: 'date',
      cssClass: 'text-center',
    },
    {
      text: 'Precio',
      action: false,
      field: 'amount',
      cssClass: 'text-center',
    },
    {
      text: 'Estado',
      action: true,
      field: 'status',
      cssClass: 'text-center',
    },
    {
      text: '',
      action: true,
      field: 'detail',
      cssClass: 'text-center',
    },
  ];

  /**
   * Contendrá todas las filas de la tabla
   */
  rows: any[]= [];

  /**
   * Cantidad de páginas de la tabla
   */
  lengthList: number = 0;

  /**
   * Objeto con los filtros de la tabla
   */
  filterFull!: OrdersFilterModel;

  /**
   * Objeto para crear los inputs de filtros que tendra la tabla
   */
  filtersObject: FilterObjectModel[] = [
    {
      "nameFilter": "Búsqueda rápida",
      "icon": "search",
      "filterType": "input",
      "options": [
        {
          "nameOption": "Búsqueda rápida",
          "nameForm": "idOrderList",
          "regex": '',
          "onlyNumber": false,
          "min": '',
          "max": "",
          "value": "",
        },
      ]
    },
    {
      "nameFilter": "Fecha",
      "icon": "date_range",
      "filterType": "date",
      "options": [
        {
          "nameOption": "Seleccionar fecha",
          "nameForm": "date",
          "min": "",
          "max": "",
          "value": ""
        }
      ]
    },
    {
      "nameFilter": "Filtro",
      "icon": "filter_list",
      "filterType": "radioSelect",
      "options": [
        {
          "nameOption": "Estatus",
          "nameForm": "status",
          "value": "",
          "subOptions": [
            {
              "nameSubOption": "Activo",
              "value": "ACTIVE",
            },
            {
              "nameSubOption": "Confirmado",
              "value": "PAID",
            },
            {
              "nameSubOption": "Declinado",
              "value": "CANCELED",
            }
          ],
        },
      ]
    },
  ];

  /**
   * Observable de suscripción al store con los filtros de la tabla
   */
  $filter: Observable<OrdersFilterModel>;

  /**
   * Posibles estatus para los mensajes y clase de la tabla
   */
  statusDictionary: CmmStatusTypeGroupsModel[] = [
    {
      statusGroup: [
        OrderStatus.rejected
      ],
      statusType: 'error',
    },
    {
      statusGroup: [
        OrderStatus.active,
      ],
      statusType: 'info',
    },
    {
      statusGroup: [
        OrderStatus.aprobated,
      ],
      statusType: 'success',
    },
  ];

  /**
   * Filtro de fecha inicial de tabla
   */
  startDate: string = '';

  /**
   * Filtro de fecha final de tabla
   */
  endDate: string = '';

  /**
   * Listado de bancos
   */
  bankList = []

  /**
   * Listado de tipos de estatus
   */
  statusList = []

  /**
   * Indica que ya cargaron todas las listas para los filtros
   */
  utilityListsLoaded: boolean = false;

  /**
   * Indica la orden que se selecciono y se desea mostrar
   */
  orderSelected: any;

  constructor(
    private dashboardService: DashboardService,
    public dataService: CmmDataService,
    private router: Router,
    private store: Store,
  ){
    //* Me suscribo al filtro de la tabla
    this.$filter = this.store.pipe(select(ordersFilter));
    this.$filter.pipe(takeUntil(this.$unsubscribe)).subscribe({
      next: (data: OrdersFilterModel) => {
        this.filterFull = data;
      },
    });
  }

  ngOnInit(): void {

    //* Obtengo el listado de estatus
    // this.getListStatusTypes();

    //* Obtengo la data de los pagosmóviles
    this.getTableData();

  }

  //? Lógica de la tabla

  /**
   * Obtiene toda la data de pagosmóviles
   */
  getTableData(): void {

    //* Llamo al servicio para obtener la data
    this.dashboardService.getUserOrders(this.filterFull)
      .pipe(
        takeUntil(this.$unsubscribe)
      )
      .subscribe({
        next: (response: any) => {

          if(!response) {
            return
          }

          this.lengthList = response.data.count;

          //* Construyo la tabla
          this.buildTable(response.data.items);

        },
        error: error => {}
      })

  }

  /**
   * Construye la tabla
   * @param tableRows
   */
  buildTable(tableRows: OrderDetailModel[]): void {

    //* Creo un array que contendrá todas las filas creadas para mostrar en la tabla
    let finalRowsArray: any[] = []

    tableRows.forEach((order: OrderDetailModel) => {
      //*Por cada row creo un objeto con las propiedades que se mostrarán en las filas
      let finalRowObj;

      //* Creo una fila
      finalRowObj = {

        idOrder: order.idOrder + '$' ?? CmmTableColumnErrorMsg,

        date: this.dataService.cmmFormatDate(
          order.created_date,
          "dmyh"
        ) ?? CmmTableColumnErrorMsg,

        amount: order.amount + '$' ?? CmmTableColumnErrorMsg,

        status:  order.status
        ? ({
            nameAction: 'statusAction',
            value: order.status,
            class: 'cursor-pointer',
            statusObject: this.dataService.CmmSetStatusType(
              order.status,
              this.statusDictionary,
              order.status,
              true
            ),
            function: '',
            tooltip: 'Ver detalle',
          } as CmmTableRow)
        : CmmTableColumnErrorMsg,

        detail: {
          nameAction: 'iconFunctionAction',
          columnName: 'detail',
          value: order.idOrder,
          icon: 'info',
          class: 'cursor-pointer',
          function: 'goDetailProduct',
          tooltip: 'Ver detalle',
        } as CmmTableRow,

      };

      //*Añado cada fila al array
      finalRowsArray.push(finalRowObj);

    });

    //*Finalmente copio el array de filas completas para que la tabla aparezca con todo el contenido de una vez
    this.rows = [...finalRowsArray];
  }

  /**
   * Recibe el filtro actualizado y ejecuta todas las transformaciones para pasarselo a getTableData.
   * @param requestObj
   * @returns
   */
  requetshttp(requestObj: any): void {

    let newFilterFull: OrdersFilterModel = {
      ...requestObj,
        limit: requestObj.limit ?? '10',
        page: requestObj.page ?? '0',
    };

    if(JSON.stringify(this.filterFull) == JSON.stringify(newFilterFull)) return;

    //* Guardo el nuevo valor del filtro
    this.filterFull = newFilterFull;

    //* Vacío las filas
    this.rows = [];

    //* Guardo el nuevo filtro en el reducer
    this.store.dispatch(
      new setOrdersFilter({ orders: this.filterFull })
    );

    //* Vuelvo a obtener la data de la tabla
    this.getTableData();

  }

  /**
   * Recibe el evento de la acción seleccionada y redirijo a la opción correspondiente
   * @param elementReceived
   */
  routerFunction(elementReceived: any): void {
    switch (elementReceived.function) {
      case 'goDetailProduct':
        this.goDetailProduct(elementReceived.value);
        break;

      default:
        break;
    }
  }

  /**
   * Limpia el filtro de la tabla y vuelve a llamar getTableData
   */
  clearFilter(): void {
    //* vacío los filtros de la tabla
    this.store.dispatch(new clearOrdersFilter());

    //* Vuelvo a llamar a la data
    this.getTableData();
  }

  //? Acciones de la tabla

  /**
   * @param product Funcion que redirige a la vista de detalle de orden
   */
  goDetailProduct(idOrder: string) {
    this.router.navigate(['dashboard/orders/detail/' + idOrder]);
  }

  ngOnDestroy(): void {
    //* Desactivo las suscripciones
    this.$unsubscribe.next();
    ;
  }

}
