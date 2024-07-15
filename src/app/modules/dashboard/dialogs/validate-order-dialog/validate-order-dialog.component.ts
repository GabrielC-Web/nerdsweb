import { Component, HostListener, Inject } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CmmComponentFormModel } from 'src/app/common/data/forms/models/form.model';
import { CmmDataService } from 'src/app/common/services/data.service';
import { DashboardService } from '../../services/dashboard.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-validate-order-dialog',
  templateUrl: './validate-order-dialog.component.html',
  styleUrls: ['./validate-order-dialog.component.scss'],
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
export class ValidateOrderDialog implements CmmComponentFormModel {

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> = new Subject();

  /**
   * Form de crear orden
   */
  componentForm!: FormGroup;

  /**
   * Listado de opciones
   */
  optionsList: any[] = [];

  /**
   * variable con las rutas de las imagenes
   */
  coverWarning: string = '';

  /**
   * Listener de el evento de keydown
   */
  @HostListener('keydown', ['$event'])
  onEnter(event: any){

    // En caso de que se este precionando la tecla enter y se haya creado el fomulario
    if(event.key == 'Enter' && this.componentForm){

      // Ejecutamos la funcion para validar el fomrualrio
      this.onSubmit();

    }

  }

  constructor(
    public dialogRef: MatDialogRef<ValidateOrderDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private dataService: CmmDataService,
    private router: Router,
    public fb: UntypedFormBuilder,
    public dashboardService: DashboardService,
  ) {}

  ngOnInit() {

    //* Creo el form
    this.createForm()

    if(this.data.aprove){
      this.optionsList = [
        {
          key: '1',
          name: 'Todos los datos del pagos son correctos',
        },
        {
          key: '2',
          name: 'El pago fue confirmado, pero se pago de mas',
        }
      ]
    }

    else {
      this.optionsList = [
        {
          key: '3',
          name: 'El pago rechazado por errores en los datos de pago',
        },
        {
          key: '4',
          name: 'El pago fue confirmado, pero se pago menos de lo requerido',
        }
      ];
    };

  }

  //? Lógica del form

  /**
   * Crea el form
   */
  createForm(): void {

    // Creo el formulario con el input de motivo de rechazo
    this.componentForm = this.fb.group({
      idOrder: [this.data.idOrder],
      aprove: [this.data.aprove],
      description: [
        '',
        [
          Validators.required,
        ],
      ],
      amount: ['']
    });

    this.componentForm.valueChanges
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe((value: any) => {
      console.log(value);

      this.componentForm.markAllAsTouched();
    });
  }

  /**
   * Envía el form
   */
  onSubmit(): void {

    // Marcamos todos los campos como tocados
    this.componentForm.markAllAsTouched();

    // Si el formulario no es valido nos detenemos aqui
    if (!this.componentForm.valid) return;

    // Hacemos la peticion pasando los valores del fomulario
    this.dashboardService.validateOrder(this.componentForm.value)
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe({
      next: (response: any) => {

        // Dirijo al usuario a la ruta para ver el detalle de la orden
        this.router.navigate(['dashboard/orders']);

        this.dialogRef.close();

      },
      error: (response: any) => {
        this.dataService.CmmSetFormApiError(response.error.data, this.componentForm);
      }
    });

  }

  ngOnDestroy(): void {
  }

}
