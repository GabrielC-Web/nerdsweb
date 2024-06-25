import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Store } from '@ngrx/store';
import { CmmDataService } from 'src/app/common/services/data.service';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmAlertToastrModel } from 'src/app/common/data/dialogs/models/dialogs.model';
import { ImagesService } from 'src/app/core/services/images.service';
import { MrwCatalog } from 'src/app/common/data/list/catalogs/mrw.catalog';
import { ZoomCatalog } from 'src/app/common/data/list/catalogs/zoom.catalog';
import { DomesaCatalog } from 'src/app/common/data/list/catalogs/domesa.catalog';
import { transition, trigger, style, animate } from '@angular/animations';

@Component({
  selector: 'cmp-payments-metods',
  templateUrl: './payments-metods.component.html',
  styleUrls: ['./payments-metods.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ]
})
export class PaymentsMetodsComponent implements OnChanges {

  /**
   * Variable que guada el valor inicial del formulario para comparar cambios
   */
  initialFormvalue!: any;

  //? Información de utilidad

  /**
   * Listado de metodos de pagos
   */
  paymentMethodsList: any[] = []

  /**
   * Metodo de pago seleccionado
   */
  paymentMethodSelected: any;

  /**
   * Metodo de envio seleccionado
   */
  deliveryMethodSelected: any;

  /**
   * Listado de productos que se encuentran en el carrito
   */
  @Input() deliveryMethodsList: any[] = [];

  /**
   * indica si es necesario que se pida la informacion de envio
   */
  @Input() deliveryRequired: boolean = false;

  /**
   * Form del reporte de pago para la orden
   */
  paymentForm!: FormGroup;

  /**
   * Form del metodo de envio para la orden
   */
  deliveryMethodControl!: FormControl<any>;

  /**
   * Form de los datos del metodo de envio para la orden
   */
  deliveryForm!: FormGroup;

  /**
   * Indica el url del mapa que se debe mostrar
   */
  urlMap: string = '';

  /**
   * Arreglo de listados para las direcciones
   */
  directionsList: any[] = [];

  //? Lógica de lifecicle

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe = new Subject<void>();

  /**
   * indica cuando pasar al siguiente paso
   */
  @Output() nextStep: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private store: Store,
    private shoppingCartServices: ShoppingCartService,
    public dialogService: CmmDialogService,
    public imagesService: ImagesService,
    public dataService: CmmDataService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void{

    // Ejecutamos la funcion para recibir el listado de metodos de pago
    this.getPaymentMethods();

  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si el valor de deliveryRequired lo indica
    if(changes['deliveryRequired'].currentValue){
      // Creamos el control de envio
      this.deliveryMethodControl = new FormControl('', Validators.required);
    }
  }

  /**
   * Obtiene el listado de metodos de pagos
   */
  getPaymentMethods() {

    // Hacemos la peticion a la api
    this.shoppingCartServices.getPayMethodsList()
    .pipe(
      // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
      takeUntil(this.$unsubscribe)
    )
    .subscribe({
      next: (response: any) => {

        // Guardamos los metodos de pago
        this.paymentMethodsList = response.data;

        // Guardamos el listado de bancos en la variable indicada
        this.paymentMethodSelected = this.paymentMethodsList[0];

        // Ejecutamos la funcion para crear el formulario de reporte de pago
        this.createPaymentForm();

      },
      error: (error: any) => {}
    });

    // // Guardamos los metodos de pago
    // this.paymentMethodsList = [
    //   {
    //       "name": "Pago movil",
    //       "description": "Transferencia bancaria rápida y eficaz a través de la red de pagos móviles",
    //       "status": "ACTIVO",
    //       "idStatus": "",
    //       "requeriments": [],
    //       "config": {
    //           "text": [
    //               {
    //                   "form": "phone",
    //                   "label": "Teléfono",
    //                   "placeholder": "Ej: 04241231234",
    //                   "regex": "(0424|0414|0412|0426|0416|424|414|412|426|416)+([0-9]{6,7})",
    //                   "onlyNumber": true,
    //                   "minLength": 11,
    //                   "maxLength": 12,
    //                   "required": true,
    //                   "Value": ""
    //               },
    //               {
    //                   "form": "reference",
    //                   "label": "N° de referencia",
    //                   "placeholder": "Ej: 1234",
    //                   "regex": "",
    //                   "onlyNumber": true,
    //                   "minLength": 4,
    //                   "maxLength": 4,
    //                   "required": true,
    //                   "Value": ""
    //               }
    //           ],
    //           "file": [
    //               {
    //                   "form": "verification",
    //                   "label": "Comprobante",
    //                   "placeholder": "Ej: 04241231234",
    //                   "required": true,
    //                   "Value": ""
    //               }
    //           ]
    //       },
    //       "extraInfo": [
    //           {
    //               "name": "Banco",
    //               "value": "Banco Activo"
    //           },
    //           {
    //               "name": "Telefono",
    //               "value": "04241231234"
    //           },
    //           {
    //               "name": "Documento",
    //               "value": "J-1234567890"
    //           }
    //       ],
    //       "idPayMethod": "65ca1b4cbca65c225af9ab9d"
    //   }
    // ];

    // // Guardamos el listado de bancos en la variable indicada
    // this.paymentMethodSelected = this.paymentMethodsList[0];

    // // Ejecutamos la funcion para crear el formulario de reporte de pago
    // this.createPaymentForm();

  }

  //? Metodos de formualrio

  /**
   * Inicializa pageForm
   */
  createPaymentForm():void{

    // Accedemos a llos inputs que corresponde a la tarjeta que se quiere editar
    const cardInputs = this.paymentMethodSelected.config;

    let group = {};

    // Por cada objeto.form que venga de dates se crea un nuevo formcontrol
    if (cardInputs.text) {

      // Por cada objeto.form que venga de inputs.select o dates, se crea un nuevo formcontrol
      cardInputs.text.forEach((input_template: any) => {

        // inicio un arreglo donde voya aguardar las validaciones del input, si es que tiene
        let ValidatorsArray = [];

        // Si el input tiene un patron regex especifico
        if(input_template.regex){
          ValidatorsArray.push(Validators.pattern(input_template.regex))
        };

        // Si el input tiene un minimo de largo
        if(input_template.minLength){
          ValidatorsArray.push(Validators.minLength(input_template.minLength))
        };

        // Si el input tiene un maximo de largo
        if(input_template.maxLength){
          ValidatorsArray.push(Validators.maxLength(input_template.maxLength))
        };

        ValidatorsArray.push(Validators.required);

        // Le asigno al arreglo de controles un nuevo paramtero con el nombre del control
        (group as any)[input_template.form] = new FormControl(
          // Le coloco el valor inicial que venga, si viene
          input_template.value,
          // y la validaciones
          ValidatorsArray
        );

      });
    }

    // Por cada objeto.form que venga de dates se crea un nuevo formcontrol
    if (cardInputs.selects) {
      cardInputs.selects.forEach((input_template: any) => {
        (group as any)[input_template.form] = new FormControl(
          input_template.value,
          Validators.required
        );
      });
    }

    // Por cada objeto.form que venga de dates se crea un nuevo formcontrol
    if (cardInputs.dates) {
      cardInputs.dates.forEach((input_template: any) => {
        (group as any)[input_template.form] = new FormControl(
          input_template.value,
          Validators.required
        );
      });
    }

    // Por cada objeto.form que venga de dates se crea un nuevo formcontrol
    if (cardInputs.file) {
      cardInputs.file.forEach((input_template: any) => {
        (group as any)[input_template.form] = new FormControl(
          input_template.value,
          Validators.required
        );
      });
    }

    //* Inicializo el formulario
    this.paymentForm = new UntypedFormGroup(group);

  }

  /**
   * Inicializa pageForm
   */
  createDeliveryForm():void{

    // Accedemos a llos inputs que corresponde a la tarjeta que se quiere editar
    const cardInputs = this.deliveryMethodSelected.config;

    let group = {};

    // Por cada objeto.form que venga de dates se crea un nuevo formcontrol
    if (cardInputs.text) {

      // Por cada objeto.form que venga de inputs.select o dates, se crea un nuevo formcontrol
      cardInputs.text.forEach((input_template: any) => {

        // inicio un arreglo donde voya aguardar las validaciones del input, si es que tiene
        let ValidatorsArray = [];

        // Si el input tiene un patron regex especifico
        if(input_template.regex){
          ValidatorsArray.push(Validators.pattern(input_template.regex))
        };

        // Si el input tiene un minimo de largo
        if(input_template.minLength){
          ValidatorsArray.push(Validators.minLength(input_template.minLength))
        };

        // Si el input tiene un maximo de largo
        if(input_template.maxLength){
          ValidatorsArray.push(Validators.maxLength(input_template.maxLength))
        };

        ValidatorsArray.push(Validators.required);

        // Le asigno al arreglo de controles un nuevo paramtero con el nombre del control
        (group as any)[input_template.form] = new FormControl(
          // Le coloco el valor inicial que venga, si viene
          input_template.value,
          // y la validaciones
          ValidatorsArray
        );

      });

    }

    // Por cada objeto.form que venga de dates se crea un nuevo formcontrol
    if (cardInputs.selects) {
      cardInputs.selects.forEach((input_template: any) => {
        (group as any)[input_template.form] = new FormControl(
          input_template.value,
          Validators.required
        );
      });
    }

    // Por cada objeto.form que venga de directions se crea un nuevo formcontrol
    if (cardInputs.directions) {
      cardInputs.directions.forEach((input_template: any) => {
        (group as any)[input_template.form] = new FormControl(
          input_template.value,
          Validators.required
        );
      });
    }

    // Por cada objeto.form que venga de map se crea un nuevo formcontrol
    if (cardInputs.map) {
      cardInputs.map.forEach((input_template: any) => {
        (group as any)[input_template.form] = new FormControl(
          input_template.value,
          Validators.required
        );
        (group as any)[input_template.form + 'Map'] = new FormControl(
          input_template.value,
          Validators.required
        );
      });
    }

    //* Inicializo el formulario
    this.deliveryForm = new UntypedFormGroup(group);

  }

  /**
   * Funcion para setear la url de una imagen cargada
   */
  setImage(controlName: string, file: any){

    if(!file) return;

    this.imagesService.postImage(file)
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe({
      next: (response: any) => {
        this.paymentForm.controls[controlName].setValue(response.data[0]);
      },
      error: (err: any) => {
        this.paymentForm.controls[controlName].reset();
      }
    })

  }

  /**
   * Funcion para setear el metodo de envio
   * @param idMethod Id del metodo de envio seleccionado
   */
  setDeliveryMethod(){

    // Obtengo el id del metodo de envio
    const idMethod = this.deliveryMethodControl.value;

    // Busco el metodo de envio correspondiente
    this.deliveryMethodSelected = this.deliveryMethodsList.find(
      (deliveryMethod: any) => deliveryMethod.idMethod == idMethod
    );

    if(!this.deliveryMethodSelected) return;

    // Creo el formulario
    this.createDeliveryForm();

  }

  /**
   * Funcion para setear la url de una imagen cargada
   */
  setUrlMap(controlName: string, index: number) {

    let value = this.deliveryForm.controls[controlName].value;

    if(value) {

      // Busco la url correspondiente
      this.urlMap = this.deliveryMethodSelected.config.map[index].list.find(
        (urlOptions: any) => urlOptions.direction == value
      ).url;

      this.deliveryForm.controls[controlName+'Map'].setValue(this.urlMap);

    }
    else{

      this.urlMap = '';

    }


  }

  /**
   * Funcion para setaer el listado de las direciones segun el input de agencia
   */
  setDirectionList(controlname: string) {

    let agencyId = this.deliveryForm.controls[controlname].value;

    switch (agencyId) {
      case "1":
        this.directionsList = MrwCatalog;
        break;
      case "2":
        this.directionsList = ZoomCatalog;
        break;
      case "3":
        this.directionsList = DomesaCatalog;
        break;
    }

  }

  /**
   * Valida el formulario y decide si puede enviarse al endpoint
   * En el error ejecutamos CmmdataService.CmmSetApiError con el objeto de error del formulario
   */
  onSubmit(): void{

    //* Activo la validación de required
    this.paymentForm.markAllAsTouched();

    if(this.deliveryRequired){
      this.deliveryMethodControl.markAsTouched();
      this.deliveryForm.markAllAsTouched();
    }

    // Si el formulario es invalido me detengo aqui
    if(!this.paymentForm.valid || ( this.deliveryRequired && !this.deliveryForm.valid) ) {
      return
    };

    // Hacemos la peticion a la api
    this.shoppingCartServices.createOrder(
      this.paymentForm.value,
      this.deliveryRequired ? this.deliveryForm.value : ''
    )
    .pipe(
      // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
      takeUntil(this.$unsubscribe)
    )
    .subscribe({
      next: (response: any) => {

        // Armamos la data de la alerta
        const messagesData: CmmAlertToastrModel = {
          typeIcon: 'success',
          text: response.message,
        };

        this.nextStep.emit(response.data);

      },
      error: (err: any) => {}
    })

  }

  /**
   * Ejecutamos el $unsubscribe
   */
  ngOnDestroy(): void{

    // terminamos cualquier proceso que estuviera pendiente
    this.$unsubscribe.next();

  }

}
