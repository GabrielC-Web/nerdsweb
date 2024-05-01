import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { FilterObjectModel, OptionFilterModel } from '../models/filter-form.model';

@Component({
  selector: 'shd-cmp-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements CmmComponentFormModel {

  //? Lógica de lifecicle

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> = new Subject();

  //? Variables del form

  /**
   * Formulario en el que se trabajará (Aplica si el form es de más de un input)
   */
  componentForm!: FormGroup

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

  ngOnInit(){};

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['filtersObjects'].currentValue && changes['filtersObjects'].currentValue.length){

      // Ejecutamos al funcion para armar lso filtros
      this.createForm()
    }
  }

  /**
   * Inicializa el componentForm
   */
  createForm(){
    let group = {};

    // Iteramos por cada uno de los campos suminitrados para el filtro
    this.filtersObjects.forEach( (filtersObject: FilterObjectModel) => {

      // En caso de que el campo sea de tipo input
      if(filtersObject.filterType == 'input'){

        // itero por cada uno de las opciones del campo
        filtersObject.options.forEach( (option: OptionFilterModel) => {

          // inicio un arreglo donde voya aguardar las validaciones del input, si es que tiene
          let ValidatorsArray = [];

          // Si el input tiene un patron regex especifico
          if(option.regex){
            ValidatorsArray.push(Validators.pattern(option.regex))
          };
          // Si el input tiene un minimo de largo
          if(option.min){
            ValidatorsArray.push(Validators.minLength(Number(option.min)))
          };
          // Si el input tiene un maximo de largo
          if(option.max){
            ValidatorsArray.push(Validators.maxLength(Number(option.max)))
          };

          // Le asigno al arreglo de controles un nuevo paramtero con el nombre del control
          (group as any)[option.nameForm] = new FormControl(
            // Le coloco el valor inicial que venga, si viene
            option.value ? option.value : '',
            // y la validaciones
            ValidatorsArray
          );

        })

      }

      // En caso de que el campo sea de tipo Cantidad
      if(filtersObject.filterType == 'quantity'){

        // itero por cada uno de las opciones del campo
        filtersObject.options.forEach( (option: OptionFilterModel) => {

          // inicio un arreglo donde voya aguardar las validaciones del input, si es que tiene
          let ValidatorsArray = [];

          // Si el input tiene un minimo de largo
          if(option.min){
            ValidatorsArray.push(Validators.min(Number(option.min)))
          };
          // Si el input tiene un maximo de largo
          if(option.max){
            ValidatorsArray.push(Validators.max(Number(option.max)))
          };

          // Le asigno al arreglo de controles un nuevo paramtero con el nombre del control
          (group as any)[option.nameForm] = new FormControl(
            // Le coloco el valor inicial que venga, si viene
            option.value ? option.value : '',
            // y la validaciones
            ValidatorsArray
          );

        })

      }

      // En caso de que el campo sea de tipo Seleccion multiple
      if(filtersObject.filterType == 'multiSelect'){

        // itero por cada uno de las opciones del campo
        filtersObject.options.forEach( (option: OptionFilterModel) => {

          // Le asigno al arreglo de controles un nuevo paramtero con el nombre del control
          (group as any)[option.nameForm] = new FormControl(
            // Le coloco el valor inicial que venga, si viene
            option.value ? option.value : false
          );

        })

      }

    })


    //* Inicializo el formulario
    this.componentForm = new UntypedFormGroup(group);

    // Ejecuto la funcion para observar todos los cambios que ocurran en el formulario
    this.listenFormChanges();

  };

  /**
   * Aquí nos suscribimos a los cambios del form
   */
  listenFormChanges(){

    console.log(this.componentForm);

    this.componentForm?.valueChanges.subscribe( (value: any) => {

      console.log(value);

    })


  };

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
