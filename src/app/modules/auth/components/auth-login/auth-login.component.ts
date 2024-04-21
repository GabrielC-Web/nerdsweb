import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmDataService } from 'src/app/common/services/data.service';
import { AuthService } from '../../services/auth.service';
import { authTokenVariable, userLoggedVariable } from 'src/app/common/data/constants/local-storage-variables';
import { Router } from '@angular/router';
import { CmmAlertToastrModel } from 'src/app/common/data/dialogs/models/dialogs.model';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';
import { MustMatch, hasSpaces, match3Char, matchAccent, matchEspec, matchMayus, matchMinus, matchNum, minChars } from 'src/app/common/validators/format.validator';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'cmp-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
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
export class AuthLoginComponent implements CmmComponentFormModel  {

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> =  new Subject();

  /**
   * Formulario de depósito
   */
  componentForm!: FormGroup<any>;

  /**
   * Formulario de depósito
   */
  componentFormUpdate!: FormGroup<any>;

  /**
   * Variable que indica si se desea actualizar la contaseña
   */
  updatepassword: boolean = false;

  /**
   * Mínimo length para contraseña
   */
  passwordMinlength: number = 8;

  /**
   * Máximo de length para la contraseña
   */
  passwordMaxLength: number = 20;

  /**
   * Validadores normalmente usados en la contraseña
   */
  passwordValidators: Validators[] = [
    Validators.required,
    minChars(this.passwordMinlength),
    Validators.maxLength(this.passwordMaxLength),
    matchMinus,
    matchMayus,
    matchNum,
    matchEspec,
    hasSpaces,
    match3Char,
    matchAccent
  ]

  /**
   * Mensajes de validación de contraseña
   */
  validatorBoxMessages: any[] = [
    {
      message: 'Debe contener mínimo '+ this.passwordMinlength +' caracteres ',
      error: 'minLength',
    },
    {
      message: 'Debe contener al menos una minúscula (a-z)',
      error: 'minus',
    },
    {
      message: 'Debe contener al menos una mayúscula (A-Z)',
      error: 'mayus',
    },
    {
      message: 'Debe contener al menos un número (0-9)',
      error: 'num',
    },
    {
      message: 'El campo no permite espacios',
      error: 'spaces',
    },
    {
      message: 'Debe contener al menos un carácter especial.',
      error: 'espec',
    },
    {
      message: 'No debe tener más de 3 caracteres iguales consecutivos',
      error: 'threeChar',
    },
    {
      message: 'No debe tener acentos',
      error: 'accent',
    },
    {
      message: 'No debe contener datos personales del usuario, ni el nombre de la empresa',
      error: '',
    },
    {
      message: 'No debe ser ninguna de las últimas 5 contraseñas colocadas.',
      error: '',
    },
  ]

  /**
   * Emite el evento de que hubo un cambio en el input
   */
  @Output() changeFunction: EventEmitter<any>  = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private dataService: CmmDataService,
    private cmmDialogsService: CmmDialogService,
    private authService: AuthService,
    public router: Router
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
      member: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      password: ['', Validators.required],
    });

    // Creo el formulario con el constructor agregando los controles necesarios
    this.componentFormUpdate = this.fb.group({
      password: ['', this.passwordValidators],
      confirmPassword: ['', [Validators.required, Validators.minLength(this.passwordMinlength), Validators.maxLength(this.passwordMaxLength)]],
      token: ['', [Validators.required, Validators.minLength(6)]]
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

    //* Envío el form al servicio
    this.authService.postLoginEndpoint(LoginInfo)
    .pipe(
      // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
      takeUntil(this.$unsubscribe)
    )
    .subscribe({
      next: response => {

          // Seteo el token del usuario
          sessionStorage.setItem(
            authTokenVariable,
            JSON.stringify(response.data.token)
          )

          // Recibo la informacion del login y la encripto y la coloco en el ls.
          sessionStorage.setItem(
            userLoggedVariable,
            this.dataService.CmmB64EncodeUnicode(JSON.stringify(response.data))
          );

          // Redirigo al dashboard (descomentar)
          this.router.navigate(['products/ecommerce']);

          // Armamos la data de la alerta
          const messagesData: CmmAlertToastrModel = {
            typeIcon: 'success',
            text: response.message,
          };

          // Abrimos la alerta con el mensaje
          this.cmmDialogsService.CmmAlertToastr(messagesData);

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
