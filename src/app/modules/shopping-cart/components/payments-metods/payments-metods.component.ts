import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Store } from '@ngrx/store';
import { CmmDataService } from 'src/app/common/services/data.service';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmAlertToastrModel } from 'src/app/common/data/dialogs/models/dialogs.model';

@Component({
  selector: 'cmp-payments-metods',
  templateUrl: './payments-metods.component.html',
  styleUrls: ['./payments-metods.component.scss']
})
export class PaymentsMetodsComponent  implements CmmComponentFormModel{

  /**
   * Variable que guada el valor inicial del formulario para comparar cambios
   */
  initialFormvalue!: any;

  //? Información de utilidad

  /**
   * Listado de metodos de pagos
   */
  paymentMethodsList: any[] = [
    {
      "id": "12124124123",
      "name": "Pago movil",
      "description": "Transferencia bancaria rápida y eficaz a través de la red de pagos móviles",
      "status": "ACTIVO",
      "extraInfo": [
        {
          "name": 'Banco',
          "value": 'Banco Activo'
        },
        {
          "name": 'Telefono',
          "value": '04241231234'
        },
        {
          "name": 'Documento',
          "value": 'J-1234567890'
        },

      ],
      "idStatus": "",
      "bol_delete": false,
      "requeriments": [],
      "config": {

        "text": [
          {
            "form": "phone",
            "label": "Teléfono",
            "placeholder": "Ej: 04241231234",
            "regex": "(0424|0414|0412|0426|0416|424|414|412|426|416)+([0-9]{6,7})",
            "onlyNumber": true,
            "minLength": 11,
            "maxLength": 12,
            "required": true,
            "value": ""
          },
          {
            "form": "reference",
            "label": "N° de referencia",
            "placeholder": "Ej: 1234",
            "regex": "",
            "onlyNumber": true,
            "minLength": 4,
            "maxLength": 4,
            "required": true,
            "value": ""
          }
        ],

        "file": [
          {
            "form": "verification",
            "label": "Comprobante",
            "placeholder": "Ej: 04241231234",
            "required": true,
            "value": ""
          }
        ]

      }
    }
  ]

  /**
   * Metodo de pago seleccionado
   */
  methodSelected: any;

  /**
   * Form para cambiar estatus
   */
  componentForm!: FormGroup

  //? Lógica de lifecicle

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe = new Subject<void>();

  constructor(
    private store: Store,
    private shoppingCartServices: ShoppingCartService,
    public dialogService: CmmDialogService,
    public dataService: CmmDataService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void{

    // Ejecutamos la funcion para recibir el listado de metodos de pago
    this.getPaymentMethods();

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

        // Guardamos el listado de bancos en la variable indicada
        this.methodSelected = this.paymentMethodsList[0];

        // Ejecutamos la funcion para crear el formulario
        this.createForm();

      },
      error: (error: any) => {}
    });

  }

  //? Metodos de formualrio

  /**
   * Inicializa pageForm
   */
  createForm():void{

    // Accedemos a llos inputs que corresponde a la tarjeta que se quiere editar
    const cardInputs = this.methodSelected.config;

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
          input_template.value
        );
      });
    }

    // Por cada objeto.form que venga de dates se crea un nuevo formcontrol
    if (cardInputs.dates) {
      cardInputs.dates.forEach((input_template: any) => {
        (group as any)[input_template.form] = new FormControl(
          input_template.value
        );
      });
    }

    // Por cada objeto.form que venga de dates se crea un nuevo formcontrol
    if (cardInputs.file) {
      cardInputs.file.forEach((input_template: any) => {
        (group as any)[input_template.form] = new FormControl(
          input_template.value
        );
      });
    }

    //* Inicializo el formulario
    this.componentForm = new UntypedFormGroup(group);

    // Guardamos el valor inicial del formualrio para futuras comparaciones
    this.initialFormvalue = this.componentForm.value;

  }

  /**
   * Valida el formulario y decide si puede enviarse al endpoint
   * En el error ejecutamos CmmdataService.CmmSetApiError con el objeto de error del formulario
   */
  onSubmit(): void{

    // Si el formulario es invalido me detengo aqui
    if(!this.componentForm.valid){

      //* Activo la validación de required
      this.componentForm.markAllAsTouched();

    };
    console.log(this.componentForm);
    return

    // Hacemos la peticion a la api
    this.shoppingCartServices.postPaymentData()
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


      },
      error: (err: any) => {}
    })

  }

  /**
   * Funcion para verificar cambio hecho en la data dle formulario
   */
  checkChanges(): boolean{

    // Comparo el valor inicial del formualrio con su valor actual
    return JSON.stringify(this.initialFormvalue) !== JSON.stringify(this.componentForm.value);

  }

  /**
   * Ejecutamos el $unsubscribe
   */
  ngOnDestroy(): void{

    // terminamos cualquier proceso que estuviera pendiente
    this.$unsubscribe.next();

  }

}
