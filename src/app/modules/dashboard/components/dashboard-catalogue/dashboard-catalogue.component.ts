import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CmmComponentTableModel, CmmStatusTypeGroupsModel, CmmTableColumnErrorMsg, CmmTableHeader, CmmTableRow } from 'src/app/common/data/tables/models/tables.model';
import { CatalogFilterModel } from 'src/app/core/reducer/module.models';
import { DashboardService } from '../../services/dashboard.service';
import { CmmDataService } from 'src/app/common/services/data.service';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { catalogFilter } from 'src/app/core/reducer/module.selectors';
import { ProductCatalogModel } from '../../models/products.models';
import { clearCatalogFilter, setCatalogFilter } from 'src/app/core/reducer/module.actions';

@Component({
  selector: 'cmp-dashboard-catalogue',
  templateUrl: './dashboard-catalogue.component.html',
  styleUrls: ['./dashboard-catalogue.component.scss']
})
export class DashboardCatalogueComponent implements CmmComponentTableModel {

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> = new Subject();

  /**
   * Headers de la tabla
   */
  header: CmmTableHeader[]= [
    {
      text: 'Id notif',
      action: false,
      field: 'idConciliationPm',
      cssClass: 'text-center',
    },
    {
      text: 'Número de referencia',
      action: false,
      field: 'transactionNumber',
      cssClass: 'text-center',
    },
    {
      text: 'Teléfono emisor',
      action: false,
      field: 'issuingPhone',
      cssClass: 'text-center',
    },
    {
      text: 'Banco emisor',
      action: false,
      field: 'issuingBankName',
      cssClass: 'text-center',
    },
    {
      text: 'Banco receptor',
      action: false,
      field: 'receivingBankName',
      cssClass: 'text-center',
    },
    {
      text: 'Estado',
      action: true,
      field: 'statusName',
      cssClass: 'text-center',
    },
    {
      text: 'Fecha',
      action: false,
      field: 'createDate',
      cssClass: 'text-center',
    },
    {
      text: 'Monto',
      action: false,
      field: 'amount',
      cssClass: 'text-center',
    },
    {
      text: 'Detalle de pago',
      action: true,
      field: 'paymentDetail',
      cssClass: 'text-center',
    },
  ];

  /**
   * Contendrá todas las filas de la tabla
   */
  rows: CmmTableRow[]= [];

  /**
   * Cantidad de páginas de la tabla
   */
  lengthList: number = 0;

  /**
   * Objeto con los filtros de la tabla
   */
  filterFull!: CatalogFilterModel;

  /**
   * Objeto para crear los inputs de filtros que tendra la tabla
   */
  filtersObject: any;

  /**
   * Observable de suscripción al store con los filtros de la tabla
   */
  $filter: any;

  /**
   * Objeto para crear grupos de estatus asociados a un tipo de color
   */
  statusDictionary: CmmStatusTypeGroupsModel[]= [];;

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
  utilityListsLoaded: boolean = false

  constructor(
    private dashboardService: DashboardService,
    public dataService: CmmDataService,
    private dialogService: CmmDialogService,
    private router: Router,
    private store: Store,
    // private xlsx: ExcelServicesService,
  ){
    //* Me suscribo al filtro de la tabla

    this.$filter = this.store.pipe(select(catalogFilter));
    this.$filter.pipe(takeUntil(this.$unsubscribe)).subscribe({
      next: (data: any) => {
        this.filterFull = data;
      },
    });
  }

  ngOnInit(): void {

    //* Obtengo el listado de estatus
    this.getListStatusTypes()

    //* Obtengo la data de los pagosmóviles
    this.getTableData()

  }

  //? Lógica de la tabla

  /**
   * Obtiene toda la data de pagosmóviles
   */
  getTableData(): void {


    //* Llamo al servicio para obtener la data
    this.dashboardService.getUserProducts(this.filterFull)
      .pipe(
        takeUntil(this.$unsubscribe)
      )
      .subscribe({
        next: (response: any) => {

          if(!response) {
            return
          }

          this.lengthList = 120;

          //* Construyo la tabla
          this.buildTable(response.data.rows);

        },
        error: error => {}
      })

  }

  /**
   * Construye la tabla
   * @param tableRows
   */
  buildTable(tableRows: ProductCatalogModel[]): void {

    //* Creo un array que contendrá todas las filas creadas para mostrar en la tabla
    let finalRowsArray: any[] = []

    tableRows.forEach((row: ProductCatalogModel) => {
      //*Por cada row creo un objeto con las propiedades que se mostrarán en las filas
      let finalRowObj;

      //* Creo una fila
      finalRowObj = {
        productName: row.productName ?? CmmTableColumnErrorMsg ,
        brand: row.brand ?? CmmTableColumnErrorMsg ,
        description: row.description ?? CmmTableColumnErrorMsg ,
        amount: row.amount ?? CmmTableColumnErrorMsg ,
        extraAmount: row.extraAmount ?? CmmTableColumnErrorMsg ,
        characteristics: row.characteristics ?? CmmTableColumnErrorMsg ,
        category: row.category ?? CmmTableColumnErrorMsg ,
        variant: row.variant ?? CmmTableColumnErrorMsg ,
        stock: row.stock ?? CmmTableColumnErrorMsg ,
        discount: row.discount ?? CmmTableColumnErrorMsg ,
        idProduct: row.idProduct ?? CmmTableColumnErrorMsg ,
        variants: row.variants ?? CmmTableColumnErrorMsg ,
        paymentDetail: {
          nameAction: 'iconFunctionAction',
          value: row,
          icon: 'info',
          class: 'cursor-pointer',
          function: 'goDetailOrder()',
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

    //* Guardo el nuevo valor del filtro
    this.filterFull = requestObj;

    //* Vacío las filas
    this.rows = [];

    //* Guardo el nuevo filtro en el reducer
    this.store.dispatch(
      new setCatalogFilter({ catalog: this.filterFull })
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
      case 'goDetailOrder()':
        this.goDetailOrder(elementReceived.value);
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
    this.store.dispatch(new clearCatalogFilter());

    //* Vuelvo a llamar a la data
    this.getTableData();
  }

  //? Acciones de la tabla

  // /**
  //  * Obtiene el excel
  //  */
  // getMobilepaymentsExcel() {

  //   //* Me suscribo al servicio para descargar el spinner
  //   this.DashboardService.getMobilePaymentsExcel(this.filterFull).pipe(takeUntil(this.$unsubscribe)).subscribe({
  //     next: (response: any) => {

  //       //* Desactivo el spinner
  //       ;

  //       //* Descargo el excel
  //       this.xlsx.saveAsExcelFile(
  //         response.body,
  //         'Historico_Pagos' +
  //           '-' +
  //           this.dataService.cmmFormatDate(
  //             this.date.transform(Date.now(), 'short') as string
  //           )
  //       );
  //     },
  //     error: (error) => {

  //       //* Desactivo el spinner
  //       ;
  //     },
  //   });
  // }

  /**
   * @param order Funcion que redirige a la vista de detalle de orden
   */
  goDetailOrder(order: any) {
    let productB64 = btoa(JSON.stringify(order));
    this.router.navigate(['merchant/reports/mobileyament_detail/'], {
      queryParams: { product: productB64 },
    });
  }

  //? Información de utilidad

  /**
   * Llama al servicio de listar tipos de estatus de pagomovil
   */
  getListStatusTypes() {

    // //* Me suscribo al servicio para obtener el listado de tipos de estatus
    // this.dashboardService.getListMobilePaymentsStatus().pipe(takeUntil(this.$unsubscribe)).subscribe({
    //   next: (response: any) => {
    //     this.statusList = response.data;

    //     //* Seteo los filtros si ya tengo todos los listados
    //     if (this.bankList.length) {
    //       this.utilityListsLoaded = true;
    //       this.setFilterFull();
    //     }

    //     //* Desactivo el spinner

    //   },
    //   error: (error) => {
    //     //* Desactivo el spinner
    //     ;
    //   },
    // });

  }

  ngOnDestroy(): void {
    //* Desactivo las suscripciones
    this.$unsubscribe.next();
    ;
  }

}
