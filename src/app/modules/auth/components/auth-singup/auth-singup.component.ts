import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmDataService } from 'src/app/common/services/data.service';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { MustMatch } from 'src/app/common/validators/format.validator';
import { CmmAlertToastrModel } from 'src/app/common/data/dialogs/models/dialogs.model';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';

@Component({
  selector: 'cmp-auth-singup',
  templateUrl: './auth-singup.component.html',
  styleUrls: ['./auth-singup.component.scss']
})
export class AuthSingupComponent implements CmmComponentFormModel  {

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
  selectList: any[] = [
    {
      name: 'tengo menos de 5 empleados',
      id: '1'
    },
    {
      name: 'Tengo entre 5 y 20 empleados',
      id: '2'
    },
    {
      name: 'Tengo entra 50 y 100 empleados',
      id: '3'
    },
    {
      name: 'Tengo más de 100 empleados',
      id: '4'
    },
  ]

  /**
   * Emite el evento de que hubo un cambio en el input
   */
  @Output() changeFunction: EventEmitter<any>  = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private dataService: CmmDataService,
    private authService: AuthService,
    private cmmDialogsService: CmmDialogService,
    private store: Store
  ) {}

  ngOnInit(): void {

    // Ejecutamos la funcion para crear el formulario
    this.createForm();

    // Ejecutamos la funcion para obtener el listado de bancos
    // this.getBanksList();

  }

  //? Métodos para obtener información de utilidad

  /**
   * Obtiene el listado de bancos
   */
  // getBanksList() {

  //   // Hacemos la peticion a la api
  //   this.listService.CmmGetBanksList(2)
  //   .pipe(
  //     // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
  //     takeUntil(this.$unsubscribe)
  //   )
  //   .subscribe({
  //     next: (response: any) => {

  //       // Guardamos el listado de bancos en la variable indicada
  //       this.banksList = response.data;

  //       // Desactivamos el spinner en common
  //       this.store.dispatch(new setSpinner(false));

  //     },
  //     error: (error: any) => {

  //       // Desactivamos el spinner en common
  //       this.store.dispatch(new setSpinner(false));

  //     }
  //   })

  // }

  //? Métodos del formulario

  /**
   * Crea el formulario de depósito
   */
  createForm(): void {

    // Creo el formulario con el constructor agregando los controles necesarios
    this.componentForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      level: ['', Validators.required],
      description: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: MustMatch('password','confirmPassword')
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

    // Creo el objeto que voy a mandar con la infomracion del formulario
    let LoginInfo: any = this.componentForm.value;

    // Encripto la clave
    LoginInfo.password = this.dataService.CmmB64EncodeUnicode(this.componentForm.controls['password'].value);

    // Encripto la confirmacion de clave
    LoginInfo.confirmPassword = this.dataService.CmmB64EncodeUnicode(this.componentForm.controls['confirmPassword'].value);

    //* Envío el form al servicio
    this.authService.postSingupEndpoint(this.componentForm.value)
    .pipe(
      // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
      takeUntil(this.$unsubscribe)
    )
    .subscribe({
      next: response => {

        // Armamos la data de la alerta
        const messagesData: CmmAlertToastrModel = {
          typeIcon: 'success',
          text: response.message,
        };

        // Abrimos la alerta con el mensaje
        this.cmmDialogsService.CmmAlertToastr(messagesData);

        this.changeFunction.emit()

      },
      error: error => {

        //! No siempre se retornan errores
        this.dataService.CmmSetFormApiError(error.error.data, this.componentForm)

      }
    });

  }

  ngOnDestroy(): void {

    // terminamos cualquier proceso que estuviera pendiente
    this.$unsubscribe.next();

  }
}
