import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { userLoggedVariable } from 'src/app/common/data/constants/local-storage-variables';
import { CmmAlertToastrModel } from 'src/app/common/data/dialogs/models/dialogs.model';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmDataService } from 'src/app/common/services/data.service';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';

@Component({
  selector: 'cmp-dashboard-user-informaction',
  templateUrl: './dashboard-user-informaction.component.html',
  styleUrls: ['./dashboard-user-informaction.component.scss'],
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
export class DashboardUserInformactionComponent implements CmmComponentFormModel {

  //? Lógica de lifecicle

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe = new Subject<void>();

  //? Variables del form

  componentForm!: FormGroup;

  //? Información de utilidad

  /**
   * Variable que almacena la informacion del usuario
   */
  userInfo: any;

  /**
   * Variable que almacena el estado base del formulario
   */
  firstFormValue: any;

  /**
   * Listado de bancos
   */
  selectList: any[] = [
    {
      name: 'Tengo menos de 5 empleados',
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
  ];

  constructor(
    private store: Store,
    public dataService: CmmDataService,
    private dialogService: CmmDialogService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void{

    // Obtenemos la informacion del usuario que esta en el ls
    this.userInfo = JSON.parse(this.dataService.CmmB64DecodeUnicode(sessionStorage.getItem(userLoggedVariable)!));

    // Ejecutamos la funcion para crear el formulario que corresponda
    this.createForm();

  }


  //? Metodos de formualrio

  /**
   * Inicializa pageForm
   */
  createForm():void{

    // Creo el formulario con el constructor agregando los controles necesarios
    this.componentForm = this.fb.group({
      username: [this.userInfo.name, Validators.required],
      email: [this.userInfo.email, Validators.required],
      level: [this.userInfo.level, Validators.required],
      description: [this.userInfo.description, Validators.required],
    });

    // GUardamos el primer estado del formaulario para futuras comparaciones
    this.firstFormValue = this.componentForm.value;

  }

  /**
   * Funcion para evaluar si hay cambios en los datos del formulario
   */
  checkFormChanges(): Boolean{

    if(JSON.stringify(this.componentForm.value) == JSON.stringify(this.firstFormValue)){
      return false
    };

    return true

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
      // this.administrationService.postConfig(this.componentForm.value)
      // .subscribe({
      //   next: response => {

      //      // Armamos la data de la alerta
      //      const messagesData: CmmAlertToastrModel = {
      //       typeIcon: 'success',
      //       text: response.message
      //     };

      //     // Abrimos la alerta con el mensaje
      //     this.dialogService.CmmAlertToastr(messagesData);

      //   },
      //   error: error => {

      //     //* Seteo los errores de input con su mensaje
      //     this.dataService.CmmSetFormApiError(error.error.data, this.componentForm);

      //   }
      // });

  }

  /**
   * Ejecutamos el $unsubscribe
   */
  ngOnDestroy(): void{

    // terminamos cualquier proceso que estuviera pendiente
    this.$unsubscribe.next();

  }

}

