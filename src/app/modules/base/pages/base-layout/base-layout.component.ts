import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { authTokenVariable } from 'src/app/common/data/constants/local-storage-variables';
import { spinner } from 'src/app/common/data/utils/reducer/utils.selector';
import { CmmDataService } from 'src/app/common/services/data.service';
import { CmmTimerSessionService } from 'src/app/common/services/timer-session.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent implements OnInit {
  /**
   * Variable que finaliza las suscripciones una vez se destruye el componente
   */
  private unsubscribe = new Subject<void>();

  /**
   * Variable que indica si se esta cargando algo
   */
  spinner: boolean = false;

  /**
   * Ruta altual
   */
  actualPath: string = '';

  /**
   * Variable que tiene el token del usuario logeado
   */
  token: any;

  constructor(
    public dataservice: CmmDataService,
    private location: Location,
    private store: Store,
    private timerSessionService: CmmTimerSessionService
  ) {

    // Guardo la ruta actual
    this.actualPath = this.location.path();

  }

  ngOnInit(): void {

    // Guardo el token que se encuentre en la seccion
    this.token = sessionStorage.getItem(authTokenVariable);

    // Ejecutamos la funcion para estar atentos del estado del spinner
    this.listenSpinnerChanges();

  }

  /**
   * Escucha los cambios del spinner
   */
  listenSpinnerChanges() {

    // Observamos el estado del spinner en commun
    this.store
      .select(spinner)
      .pipe(

        // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
        takeUntil(this.unsubscribe)

      )
      .subscribe({
        next: (data: any) => {

          setTimeout(() => {

            // Activamos o no el spinner segun nos idique su estado
            this.spinner = data;

          }, 0);

        },
      });

  }

  /**
   * Cierra la sesión
   */
  logout() {

    // Ejecuatamos el servicio de cierre de session
    this.timerSessionService.CmmCloseSession();

  }

}
