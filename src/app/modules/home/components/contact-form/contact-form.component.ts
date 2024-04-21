import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { setSpinner } from 'src/app/common/data/utils/reducer/utils.actions';
import { CmmDataService } from 'src/app/common/services/data.service';

@Component({
  selector: 'cmp-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements CmmComponentFormModel {
  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> =  new Subject();

  /**
   * Formulario de depósito
   */
  componentForm!: FormGroup<any>;

  //? Información de utilidad

  /**
   * Listado de bancos
   */
  banksList: any[] = []

  constructor(
    private fb: FormBuilder,
    private dataService: CmmDataService,
    private store: Store
  ) {}

  ngOnInit(): void {

    // Ejecutamos la funcion para crear el formulario
    this.createForm();


  }

  //? Métodos del formulario

  /**
   * Crea el formulario de depósito
   */
  createForm(): void {

    // Creo el formulario con el constructor agregando los controles necesarios
    this.componentForm = this.fb.group({
      message: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required]
    });

  }

  /**
   * Se suscribe al formulario y ejecuta las acciones pertinentes
   */
  listenFormChanges(): void {
    //*Por ahora no hay ninguna utilidad de esto
  }

  /**
   * Envía el formulario en caso de que esté correcto
   * @returns
   */
  onSubmit(): void {

    //* Los marco como touched para activar la validación de required
    this.componentForm.markAllAsTouched();

    //* Si el form no cumple con las validaciones no lo deja pasar
    if(this.componentForm.invalid) {
      return
    };

    //* Activo spinner
    this.store.dispatch(new setSpinner(true));

    //* Activamos el spinner en common
    this.store.dispatch(new setSpinner(true));

    //* Convierto el monto a el formato para backend
    this.componentForm.controls['amount'].patchValue(
      this.dataService.CmmAmountBackendFormat(this.componentForm.controls['amount'].value)
    );

    // //* Envío el form al servicio
    // this.userService.postDeposit(this.componentForm.value)
    // .pipe(
    //   // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
    //   takeUntil(this.$unsubscribe)
    // )
    // .subscribe({
    //   next: response => {

    //   },
    //   error: error => {

    //     //! No siempre se retornan errores
    //     this.dataService.CmmSetFormApiError(error.error.data, this.componentForm)

    //   }
    // });

  }

  ngOnDestroy(): void {

    // terminamos cualquier proceso que estuviera pendiente
    this.$unsubscribe.next();

  }
}
