import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmDataService } from 'src/app/common/services/data.service';
import { FilterObjectModel } from 'src/app/core/shared/models/filter-form.model';
import { ProductCatalogModel, VariantModel, typeProducts } from '../../models/products.models';
import { Location } from '@angular/common';
import { ImagesService } from 'src/app/core/services/images.service';
import { DashboardService } from '../../services/dashboard.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CmmAlertModalModel } from 'src/app/common/data/dialogs/models/dialogs.model';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss'],
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
export class DashboardProductComponent implements CmmComponentFormModel {

  //? Lógica de lifecicle

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> = new Subject();

  //? Variables del form

  /**
   * Formulario en el que se trabajará (Aplica si el form es de más de un input)
   */
  componentForm!: FormGroup;

  //? Variables con información de utilidad para el form

  /**
   * Input del arreglo de filtros con el que se va a armar el fomulario
   */
  @Input() titulo!: string;

  /**
   * Input del arreglo de filtros con el que se va a armar el fomulario
   */
  @Input() actionButtonText!: string;

  /**
   * Input del arreglo de filtros con el que se va a armar el fomulario
   */
  @Input() filtersObjects!: FilterObjectModel[];

  /**
   * Variable que envia el evento de click al componente
   */
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  //! Datos del producto

  /**
   * datos del producto que se quiere editar si es que se recibieron algun producto
   */
  product!: ProductCatalogModel;

  /**
   * Lista de categorias que posee el producto
   */
  productCategories!: String[];

  /**
   * Tipos de productos
   */
  typeProducts = typeProducts;

  /**
   * Lista de caracterisricas que posee el producto
   */
  productCharacteristics!: String[];

  /**
   * Lista de caracterisricas que posee el producto
   */
  productTypeList: any[] = [];

  /**
   * indica si activar alarma de poco stock o no
   */
  enableEmptyStockAlert: boolean = false;

  //!Datos de las variables

  /**
   * Los distintos tipos de variables
   */
  typeVariantsList: any[] = [
    {
      typeVariantId: '1',
      typeName: 'Talla',
      placeholder: 'Ej: S',
      infoSelect: [
        {
          name: 'Talla',
          variantIndentityName: ''
        }
      ]
    },
    {
      typeVariantId: '6664eef8e6707fa195f44dfb',
      typeName: 'Color',
      placeholder: 'Ej: Negro',
      infoSelect: [
        {
          name: 'Color',
          variantIndentityName: ''
        }
      ]
    },
    {
      typeVariantId: '3',
      typeName: 'Talla + Color',
      placeholder: 'Ej: S',
      infoSelect: [
        {
          name: 'Talla',
          variantIndentityName: ''
        },
        {
          name: 'Color',
          variantIndentityName: ''
        }
      ]
    },
    {
      typeVariantId: '66227d217fdb4313de67b60b',
      typeName: 'Modelo',
      placeholder: 'Ej: Empresarial',
      infoSelect: [
        {
          name: 'Modelo',
          variantIndentityName: ''
        }
      ]
    },

  ];

  /**
   * Indica el tipo de variable que se va a utilizar para el producto
   */
  typeVariant: any;

  /**
   * Indica el tipo de variable que se va a utilizar para el producto
   */
  productVariants: VariantModel[] = [];

  constructor(
    public dataServices: CmmDataService,
    public dialogService: CmmDialogService,
    public dashboardService: DashboardService,
    public imagesService: ImagesService,
    private router: Router,
    private route: ActivatedRoute,
    public location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {
        this.product = params['product'] && JSON.parse(this.dataServices.CmmB64DecodeUnicode(params['product']));
      }
    );

    if(!this.product){
      this.product = {
        productName: '',
        category: [],
        amount: null,
        description: '',
        brand: '',
        characteristics: [],
        extraAmount: null,
        discount: null,
        visible: true,
        status: 'Inactivo',
        stock: '',
        type: '',
        limitStock: '',
        image: [],
        variants: [],
        variant: false
      }
    }

    // Ejecutamos al funcion para armar lso filtros
    this.createForm();

  }

  /**
   * Inicializa el componentForm
   */
  createForm() {

    // Creo el formulario con el constructor agregando los controles necesarios
    this.componentForm = this.fb.group({
      productName: [this.product.productName, Validators.required],
      category: [''],
      amount: [this.product.amount, Validators.required],
      description: [this.product.description, Validators.required],
      brand: [this.product.brand, Validators.required],
      characteristics: [''],
      extraAmount: [this.product.extraAmount],
      discount: [this.product.discount],
      visible: [this.product.visible, Validators.required],
      status: [this.product.status, Validators.required],
      stock: [this.product.stock],
      type: [this.product.type || typeProducts.physical],
      limitStock: [this.product.limitStock],
      variants: this.fb.array([]),
      images: this.fb.array([]),
    });

    if(this.product.idProduct){
      this.componentForm.addControl('idProduct', new FormControl(this.product.idProduct))
    }

    // Guardamos el array de categorias del producto
    this.productCategories = this.product.category;

    // Guardamos el array de caracteristicas del producto
    this.productCharacteristics = this.product.characteristics;

    if(this.product.variant) {
      this.typeVariant = {
        typeVariantId: '4',
        typeName: 'Modelo',
        placeholder: 'Ej: Empresarial',
        infoSelect: []
      };
    }

    // Agrego el arreglo de variantes que haya en productos al fomrulario
    this.product.variants.forEach((variant: VariantModel) => this.addVariant(variant));

    // gregamos un campo de imagenes
    this.addImage();

    // Agrego el arreglo de imagenes que haya en productos al fomrulario
    this.product.image.forEach((image: string) => this.addImage(image));

    this.changeAlertStock(this.enableEmptyStockAlert);

  };

  get variants() {
    return this.componentForm.controls['variants'] as FormArray;
  }

  get images() {
    return this.componentForm.controls['images'] as FormArray;
  }

  /**
   * Aquí nos suscribimos a los cambios del form
   */
  listenFormChanges(){

    this.componentForm.valueChanges.subscribe( (value: any) => {

      console.log(value);

    })


  };

  /**
   * Funcion par acambiar el valor de uno de los campos
   */
  changeValueForm(formName: string, value: any, enable: boolean = true){
    this.componentForm.controls[formName].setValue(value);
  }

  /**
   * Funcion par acambiar el valor de uno de los campos
   */
  changeAlertStock(enable: boolean){

    this.enableEmptyStockAlert = enable

    if(!enable) {
      this.componentForm.controls['limitStock'].disable();
    }
    else if(this.componentForm.controls['limitStock'].disabled) {
      this.componentForm.controls['limitStock'].enable();
    }

  }

  /**
   * Funcion para agregar una categoria al arreglo
   */
  addCategorie(){
    let newCategorie = this.componentForm.controls['category'].value;

    if(newCategorie){
      this.productCategories.push(newCategorie);
      this.componentForm.controls['category'].setValue('');
    }
  }

  /**
   * Funcion para agregar una caracteristica al arreglo
   */
  addCharacteristics(){
    let newCharacteristics = this.componentForm.controls['characteristics'].value;

    if(newCharacteristics){
      this.productCharacteristics.push(newCharacteristics);
      this.componentForm.controls['characteristics'].setValue('');
    }
  }

  /**
   * Funcion para agregar las variables al arreglo
   */
  addVariant(variant?: VariantModel) {
    const arreglo = this.componentForm.get('variants') as FormArray;

    const grupo = this.fb.group(
      variant && variant.idVariant
      ? {
        idVariant: [variant?.idVariant ?? ''],
        name: [variant?.name ?? ''],
        color: [variant?.color ?? ''],
        variantImage: [variant?.image[0] ?? ''],
        stock: [variant?.stock ?? ''],
        variantPrice: [variant?.variantPrice ?? ''],
        infoSelect: [this.typeVariant?.infoSelect],
      }
      : {
        name: [variant?.name ?? ''],
        color: [variant?.color ?? ''],
        variantImage: [variant?.image[0] ?? ''],
        stock: [variant?.stock ?? ''],
        variantPrice: [variant?.variantPrice ?? ''],
        infoSelect: [this.typeVariant?.infoSelect],
      }
    )

    arreglo.push(grupo);

  }

  /**
   * Funcion para agregar las imagenes al arreglo
   */
  addImage(image: string = '') {

    const arreglo = this.componentForm.get('images') as FormArray;

    const control = new FormControl(image);

    arreglo.push(control);

  }

  /**
   * Funcion para setear la url de una imagen cargada
   */
  setImage(index: number, isVariant: boolean = false){

    const img = isVariant
    ? this.variants.controls[index].value
    : this.images.controls[index].value;

    if(!img) {

      isVariant
        ? this.variants.controls[index].setValue('')
        : this.images.controls[index].setValue('');

      return;
    };

    this.imagesService.postImage(img)
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe({
      next: (response: any) => {
        console.log(response);

      },
      error: (err: any) => {
        this.images.controls[index].setValue('');
      }
    })

  }

  /**
   * Funcion para eliminar una variante
   */
  deletedAllVariant() {
    this.variants.clear();
  }

  /**
   * Funcion para eliminar una variante
   */
  deletedVariant(index: number) {
    this.variants.removeAt(index);
  }

  /**
   * Funcion para eliminar una imagen
   */
  deletedImage(index: number) {
    this.images.removeAt(index);
  }

  /**
   * Funcion para eliminar una categoria
   */
  deletedCategorie(index: number) {

    this.productCategories.splice(index, 1);

  }

  /**
   * Funcion para eliminar una caracteristica
   */
  deletedCharacteristics(index: number) {

    this.productCharacteristics.splice(index, 1);

  }

  /**
   * Valida el formulario y decide si puede enviarse al endpoint
   * En el error ejecutamos CmmdataService.CmmSetApiError con el objeto de error del formulario
   */
  onSubmit(){

    this.componentForm.markAllAsTouched();

    console.log(this.componentForm);

    if(!this.componentForm.valid) return;

    let finalProduct = {
      ... this.componentForm.value,
      category: this.productCategories,
      characteristics: this.productCharacteristics,
      variant: Boolean(this.variants.controls.length),
    }

    console.log(finalProduct);

    if(this.product.idProduct){
      this.dashboardService.putUserProduct(finalProduct)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe({
        next: (response) => {

          // Armamos la data de la alerta
          const messagesData: CmmAlertModalModel = {
            title: response.message,
            text: '',
            giftData: '',
            typeIcon: 'success',
            showCancelButton: false,
            showConfirmButton: true,
            cancelButtonText: '',
            confirmButtonText: 'Aceptar',
          }

          // Abrimos la alerta con el mensaje
          this.dialogService.CmmAlertModal(messagesData);

          this.router.navigate(['dashboard/cataloge']);
        },
        error: (err) => {console.log(err)}
      })
    }

    else {
      this.dashboardService.addUserProduct(finalProduct)
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe({
        next: (response) => {

          // Armamos la data de la alerta
          const messagesData: CmmAlertModalModel = {
            title: response.message,
            text: '',
            giftData: '',
            typeIcon: 'success',
            showCancelButton: false,
            showConfirmButton: true,
            cancelButtonText: '',
            confirmButtonText: 'Aceptar',
          }

          // Abrimos la alerta con el mensaje
          this.dialogService.CmmAlertModal(messagesData);

          this.router.navigate(['dashboard/cataloge']);
        },
        error: (err) => {console.log(err)}
      })

    };

  }

  /**
   * Ejecutamos el $unsubscribe
   */
  ngOnDestroy(){

  };

}
