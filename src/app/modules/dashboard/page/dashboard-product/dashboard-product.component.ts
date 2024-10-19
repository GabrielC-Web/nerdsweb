import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmDataService } from 'src/app/common/services/data.service';
import { FilterObjectModel } from 'src/app/core/shared/models/filter-form.model';
import { ProductModel, VariantModel, typeProducts } from '../../models/products.models';
import { Location } from '@angular/common';
import { ImagesService } from 'src/app/core/services/images.service';
import { DashboardService } from '../../services/dashboard.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CmmAlertModalModel } from 'src/app/common/data/dialogs/models/dialogs.model';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';

@Component({
  selector: 'pag-dashboard-product',
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
  product: ProductModel = {
    name: '',
    categories: [],
    price: null,
    description: '',
    brand: '',
    characteristics: '',
    extraPrice: null,
    discount: null,
    visible: true,
    status: 'Inactivo',
    stock: '',
    type: '',
    gallery: [],
    products_variants: [],
  };

  /**
   * Lista de categorias que posee el producto
   */
  categoriesList!: {
    idCategory: string;
    name: string;
  }[];

  /**
   * Lista de categorias que posee el producto
   */
  productCategories!: {
    idCategory: string;
    categoryName: string;
  }[];

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

    // Buscamos en la ruta si se indico algun id
    const idProduct = this.route.snapshot.queryParamMap.get('idProduct');

    // Si se indico un id
    if(idProduct) {
      // obtenemos el detalle del producto
      this.getProductDetail(idProduct.toString());
    }

    // En caso contrario
    else {
      // Ejecutamos al funcion para armar el formulario
      this.createForm();
    }

    this.getCategoryList()

  }

  /**
   * Funcion para obetner el detalle del producto
   */
  getProductDetail(idProduct: string) {

    this.dashboardService.getUserProductDetail(idProduct)
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe({
      next: (response) => {

        // Guardamos la informacion del producto
        this.product = response.data;

        // Ejecutamos al funcion para armar el formulario
        this.createForm();

      },
      error: (error) => {}
    })
  }

  /**
   * Inicializa el componentForm
   */
  createForm() {

    // Creo el formulario con el constructor agregando los controles necesarios
    this.componentForm = this.fb.group({
      name: [this.product.name, Validators.required],
      brand: [this.product.brand, Validators.required],
      price: [this.product.price, Validators.required],
      extraPrice: [this.product.extraPrice],
      discount: [this.product.discount],
      description: [this.product.description, Validators.required],
      characteristics: [''],
      visible: [this.product.status, Validators.required],
      stock: [this.product.stock ?? 0],
      type: [this.product.type || typeProducts.physical],
      category: [''],
      products_variants: this.fb.array([]),
      gallery: this.fb.array([]),
    });

    if(this.product.idProduct){
      this.componentForm.addControl('idProduct', new FormControl(this.product.idProduct))
    }

    // Guardamos el array de categorias del producto
    this.productCategories = this.product.categories;

    // Guardamos el array de caracteristicas del producto
    this.productCharacteristics = [this.product.characteristics];

    // Agrego el arreglo de variantes que haya en productos al fomrulario
    this.product.products_variants.forEach((products_variants: VariantModel) => this.addVariant(products_variants));

    // gregamos un campo de imagenes
    this.addImage();

    // Agrego el arreglo de imagenes que haya en productos al fomrulario
    this.product.gallery.forEach((image: {url: string}) => this.addImage(image.url));

    this.listenFormChanges();

  };

  get products_variants() {
    return this.componentForm.controls['products_variants'] as FormArray;
  }

  get gallery() {
    return this.componentForm.controls['gallery'] as FormArray;
  }

  /**
   * Aquí nos suscribimos a los cambios del form
   */
  listenFormChanges(){

    this.componentForm.controls['category'].valueChanges
    .pipe(
      takeUntil(this.$unsubscribe),
      distinctUntilChanged(),
      debounceTime(500),
    )
    .subscribe( (value: any) => {

      // Buscamos si entre las categorias esta la que se busca
      const result = this.categoriesList.find((category: any) => category.name === value);

      // Si no existe la categoria buscamos filtrando los resultados
      if(!result){
        this.getCategoryList(value);
      }

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
   * Funcion para obtener el listado de categorias
   */
  getCategoryList(name: string = '') {

    this.dashboardService.getProductsCategoryList(name)
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe({
      next: (response) => {
        this.categoriesList = response.data.rows;
      },
      error: (error) => {}
    })
  }

  /**
   * Funcion para crear una categoria
   */
  createCategory(name: string){

    this.dashboardService.createCategoryProduct(name)
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe({
      next: (response) => {
        this.addCategory()
      },
      error: (error) => {}
    })
  }

  /**
   * Funcion para agregar una categoria al arreglo
   */
  addCategory(){

    let newCategorie = this.componentForm.controls['category'].value;

    console.log(newCategorie);

    if (this.categoriesList.find((category) => category.name === newCategorie)) {

    }

    else {
      this.createCategory(newCategorie);
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
  addVariant(products_variants?: VariantModel) {
    const arreglo = this.componentForm.get('products_variants') as FormArray;

    const grupo = this.fb.group(
      {
        idVariant: [products_variants?.idVariant ?? ''],
        name: [products_variants?.name ?? ''],
        size: [products_variants?.name ?? ''],
        color: [products_variants?.color ?? ''],
        variant_gallery: [products_variants?.variant_gallery[0]?.url ?? ''],
        referralStock: [products_variants?.referralStock ?? ''],
        referralPrice: [products_variants?.referralPrice ?? ''],
      }
    )

    arreglo.push(grupo);

  }

  /**
   * Funcion para agregar las imagenes al arreglo
   */
  addImage(image: string = '') {

    const arreglo = this.componentForm.get('gallery') as FormArray;

    const control = new FormControl(image);

    arreglo.push(control);

  }

  /**
   * Funcion para setear la url de una imagen cargada
   */
  setImage(index: number, isVariant: boolean = false){

    const img = isVariant
    ? this.products_variants.controls[index].value
    : this.gallery.controls[index].value;

    if(!img) {

      isVariant
        ? this.products_variants.controls[index].setValue('')
        : this.gallery.controls[index].setValue('');

      return;
    };

    // this.imagesService.postImage(img)
    // .pipe(takeUntil(this.$unsubscribe))
    // .subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     isVariant
    //       ? this.products_variants.controls[index].setValue(response.data[0])
    //       : this.gallery.controls[index].setValue(response.data[0]);
    //   },
    //   error: (err: any) => {
    //     this.gallery.controls[index].setValue('');
    //   }
    // })

  }

  /**
   * Funcion para eliminar una variante
   */
  deletedAllVariant() {
    this.products_variants.clear();
  }

  /**
   * Funcion para eliminar una variante
   */
  deletedVariant(index: number) {
    this.products_variants.removeAt(index);
  }

  /**
   * Funcion para eliminar una imagen
   */
  deletedImage(index: number) {
    this.gallery.removeAt(index);
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

    if(!this.componentForm.valid) return;

    let finalProduct = {
      ... this.componentForm.value,
      price: this.dataServices.CmmAmountBackendFormat(this.componentForm.controls['amount'].value.toString()),
      extraPrice: this.dataServices.CmmAmountBackendFormat(this.componentForm.controls['extraAmount'].value.toString()),
      discount: this.dataServices.CmmAmountBackendFormat(this.componentForm.controls['discount'].value.toString()),
      category: this.productCategories,
      characteristics: this.productCharacteristics,
      products_variants: Boolean(this.products_variants.controls.length),
    }

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
