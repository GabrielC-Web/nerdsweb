import { Component, OnInit } from '@angular/core';
import { bellIcon, cardsIcon, clipIcon, eardphonesIcon, plusIcon, tickeIcon } from 'src/assets/images/images-routes';
import { DashboardService } from '../../services/dashboard.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'cmp-dashboard-services',
  templateUrl: './dashboard-services.component.html',
  styleUrls: ['./dashboard-services.component.scss']
})
export class DashboardServicesComponent implements OnInit {
  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> =  new Subject();
  /**
   * Url de las imagenes
   */
  bellIcon: string = bellIcon;
  eardphonesIcon: string = eardphonesIcon;
  plusIcon: string = plusIcon;
  tickeIcon: string = tickeIcon;

  /**
   * Variable que almacena la informacion del usuario
   */
  userInfo!: any

  /**
   * Variable que almacena los sericios contratados por el usuario
   */
  userServices: any;

  /**
   * Variable que contiene el servicio que se selecciono
   */
  serviceSelected: any;

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {

    // Ejecutamos la funcion para obtener el listado de los servicios
    // this.getUserServices();

  }

  /**
   * Funcion para solicitar los servicios del usuario
   */
  getUserServices() {

    // this.dashboardService.getUserProducts()
    // .pipe(
    //   takeUntil(this.$unsubscribe)
    // )
    // .subscribe({
    //   next: (response: any) => {

    //   }
    // })
  }
}
