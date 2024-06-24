import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Store } from '@ngrx/store';
import { CmmDataService } from 'src/app/common/services/data.service';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmAlertToastrModel } from 'src/app/common/data/dialogs/models/dialogs.model';
import { ImagesService } from 'src/app/core/services/images.service';

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
  paymentMethodsList: any[] = []

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
    this.componentForm = new UntypedFormGroup(group);
    console.log(this.componentForm);

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
        this.componentForm.controls[controlName].setValue(response.data[0]);
      },
      error: (err: any) => {
        this.componentForm.controls[controlName].reset();
      }
    })

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
      return
    };

    // Hacemos la peticion a la api
    this.shoppingCartServices.createOrder(this.componentForm.value)
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
