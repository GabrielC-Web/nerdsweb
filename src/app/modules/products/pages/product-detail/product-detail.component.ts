import { Component, OnInit } from '@angular/core';
import { ProductModel, VariantModel } from '../../models/products.model';
import { Subject, takeUntil } from 'rxjs';
import { instagramPostsImg } from 'src/assets/images/images-routes';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Productservice } from '../../services/product.service';
import { CmmDataService } from 'src/app/common/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { CmmAlertToastrModel } from 'src/app/common/data/dialogs/models/dialogs.model';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';

@Component({
  selector: 'pag-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
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
  ],
})
export class ProductDetailComponent implements CmmComponentFormModel {
  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> =  new Subject();

  /**
   * Url de las imagenes
   */
  instagramPostsImg: string = instagramPostsImg;

  //? Variables del form

  componentForm!: FormGroup;

  /**
   * Variable que guarda los datos del producto
   */
  product!: ProductModel;

  /**
   * Arreglo con las imagenes de cada plantilla disponible
   */
  templateArray: VariantModel[] = [];

  /**
   * Variable que almacena informacion del template seleccionado
   */
  templateSelectedInfo?: VariantModel;

  /**
   * Variable que Contiene las motivaciones para tus redes sociales
   */
  objectivesArray: {
    text: string,
    isActive: boolean
  }[] = [
    {
      text: 'Llegar a más clientes potenciales',
      isActive: false
    },
    {
      text: 'Incrementar mis seguidores',
      isActive: false
    },
    {
      text: 'Mayor econocimiento ',
      isActive: false
    },
    {
      text: 'Incrementar mis ventas',
      isActive: false
    },
  ];

  constructor(
    private fb: FormBuilder,
    private productservice: Productservice,
    public dataService: CmmDataService,
    private route: ActivatedRoute,
    private cmmDialogsService: CmmDialogService,
    private router: Router
  ){}

  ngOnInit(): void {

    // Ejecutamos la funcion para obtener el detalle del producto
    this.getProductDetail();

  }

  //? Métodos para obtener información de utilidad

  /**
   * Obtiene el detalle de producto
   */
  getProductDetail(){

    const productId = this.route.snapshot.params['idproduct'];

    // Llamo al servicio
    this.productservice.getProductsList('', productId)
    .pipe(
      // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
      takeUntil(this.$unsubscribe)
    )
    .subscribe({
      next: (response) => {

        // Accedemos data de la respuesta
        response = (response as any).data;

        // Guardamos el producto obtenido
        this.product = response[0];

        // Seteo las opciones de variantes del producto
        this.templateArray = this.product.variants;

        // Ejecutamos la funcion para crear el fomrulario
        this.createForm();

      },
      error: (error) => {},
    });

  }

  //? Metodos de formualrio

  /**
   * Inicializa pageForm
   */
  createForm():void{

    // Creo el formulario con el constructor agregando los controles necesarios
    this.componentForm = this.fb.group({
      idProduct: [
        this.product.idProduct,
      ],
      quantity: [
        '1',
        Validators.required,
      ]
    });

    if(this.product.category[0] == 'socialmedia'){
      this.componentForm.addControl('objectives', new FormControl('', Validators.required));
    }

    if(this.product.category[0] == 'ecommerce'){
      this.componentForm.addControl('idVariant', new FormControl('', Validators.required));
    }

  }

  /**
   * geter que retorna el template seleccionado que se encuentra en el form
   */
  get templateSelected(): FormControl {
    return this.componentForm.controls['idVariant'] as FormControl;
  }

  /**
   * Funcion para seleccionar una plantilla
   */
  setTemplate(idVariant: string){

    // Accedemos al campo y seteamos el id indicado como su valor
    this.componentForm.controls['idVariant'].setValue(idVariant);

    this.templateSelectedInfo = this.templateArray.find((template: VariantModel) => template.idVariant == idVariant );

  }

  /**
   * Funcion para seleccionar una los objetivos que se desean de la cuenta
   */
  setObjetive(index: number, isActive: boolean){

    this.objectivesArray[index].isActive = isActive;

    let objectives: any[] = [];

    this.objectivesArray.forEach((objective: any) => {

      if(objective.isActive){
        objectives.push(objective.text);
      };

    });

    this.componentForm.controls['objectives'].setValue(objectives);

  }

  /**
   * Valida el formulario y decide si puede enviarse al endpoint
   * En el error ejecutamos CmmdataService.CmmSetApiError con el objeto de error del formulario
   */
  onSubmit(): void{

    // Marcamos todos controles del formaularios como marcados para rezaltar los posibles errores
    this.componentForm.markAllAsTouched();

    // Si el formulario es invalido me detengo aqui
    if(!this.componentForm.valid){
      return
    };

    // Hacemos la peticion a la api
    this.productservice.postNewProductsToShoppingCard(this.componentForm.value)
    .subscribe({
      next: response => {

        // Armamos la data de la alerta
        const messagesData: CmmAlertToastrModel = {
          typeIcon: 'success',
          text: response.message,
        };

        // Abrimos la alerta con el mensaje
        this.cmmDialogsService.CmmAlertToastr(messagesData);

        // Navegamos a la ruta del carrito
        this.router.navigate(['shopping-cart']);

      },
      error: error => {

        //* Seteo los errores de input con su mensaje
        this.dataService.CmmSetFormApiError(error.error.data, this.componentForm);

      }
    });

  }

  /**
   * Ejecutamos el $unsubscribe
   */
  ngOnDestroy(): void{

    // terminamos cualquier proceso que estuviera pendiente
    this.$unsubscribe.next();

  }

}
