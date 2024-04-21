import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationError, Router } from '@angular/router';
import { userLoggedVariable } from 'src/app/common/data/constants/local-storage-variables';
import { CmmDataService } from 'src/app/common/services/data.service';
import { NerdsWebLogo } from 'src/assets/images/images-routes';

@Component({
  selector: 'cmp-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss'],
})
export class BaseHeaderComponent implements OnInit {

  /**
   * Url de las imagenes
   */
  NerdsWebLogo: string = NerdsWebLogo;

  /**
   * Variable que tiene la info del usuario logeado
   */
  userInfo: any;

  constructor(
    private router: Router,
    public dataServices: CmmDataService
  ) {

    // Ejecutamos la funcion para estar atentos a los movimeintos entre rutas
    this.subscribeRouter();

  }

  ngOnInit(): void {

    if(sessionStorage.getItem(userLoggedVariable)){

      // Saco la info del usuario desde el ls para usar en mi objeto
      this.userInfo = JSON.parse(this.dataServices.CmmB64DecodeUnicode(sessionStorage.getItem(userLoggedVariable)!));

    }

  }

  // Bid router events to urlEvents funtion
  subscribeRouter() {

    // Estamos atentos a todos los eventos de cambios de ruta
    this.router.events.subscribe((event: Event) => {

      // On NavigationEnd
      if (event instanceof NavigationEnd) {
        // Al navegar reiniciar el scroll de la vista
        window.scrollTo(0, 0);
      };

      // On NavigationError
      if (event instanceof NavigationError) {
        // Al navegar reiniciar el scroll de la vista
        window.scrollTo(0, 0);
      };

    });

  }

}
