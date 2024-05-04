import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmDataService } from 'src/app/common/services/data.service';
import { FilterObjectModel } from 'src/app/core/shared/models/filter-form.model';
import { ProductCatalogModel } from '../../models/products.models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss']
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

  /**
   * datos del producto que se quiere editar si es que se recibieron algun producto
   */
  product!: ProductCatalogModel;
  /**
   * datos del producto que se quiere editar si es que se recibieron algun producto
   */
  productCategories!: String[];

  constructor(
    public dataServices: CmmDataService,
    private route: ActivatedRoute,
    public location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params => {

        this.product = JSON.parse(this.dataServices.CmmB64DecodeUnicode(params['product']));;

        console.log(this.product); // popular

      }
    );

    // Ejecutamos al funcion para armar lso filtros
    this.createForm();

  }

  /**
   * Inicializa el componentForm
   */
  createForm(){

    // Creo el formulario con el constructor agregando los controles necesarios
    this.componentForm = this.fb.group({
      productName: [this.product.productName, Validators.required],
      category: [''],
      amount: [this.product.amount, Validators.required],
      description: [this.product.description, Validators.required],
      brand: [this.product.brand, Validators.required],
      characteristics: [this.product.characteristics, Validators.required],
      extraAmount: [this.product.extraAmount, Validators.required],
      discount: [this.product.discount, Validators.required],
      visible: [this.product.visible, Validators.required],
      status: [this.product.status, Validators.required],
    });

    // Guardamos el array de categorias del producto
    this.productCategories = this.product.category;

    // Ejecuto la funcion para observar todos los cambios que ocurran en el formulario
    this.listenFormChanges();

  };

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
  changeValueForm(formName: string, value: any){
    this.componentForm.controls[formName].setValue(value);
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
   * Funcion para eliminar una categoria
   */
  deletedCategorie(index: number) {

    this.productCategories.splice(index, 1);

  }

  /**
   * Valida el formulario y decide si puede enviarse al endpoint
   * En el error ejecutamos CmmdataService.CmmSetApiError con el objeto de error del formulario
   */
  onSubmit(){

  };

  /**
   * Ejecutamos el $unsubscribe
   */
  ngOnDestroy(){

  };

}
