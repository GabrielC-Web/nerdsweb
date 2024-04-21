import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class DashboardService {

  /**
   * Variable que contiene la url del gateway
   */
  gatewayUrl: string;

  constructor(private http: HttpClient) {

    // Seteamos el la url base
    this.gatewayUrl = environment.CC_GATEWAY_URL;

  }

  /**
   * @description Servicio para realizar login
   * @param formLogin Datos del usuario necesarios para hacer login
   * @returns
   */
  getUserServices(): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/profile/getCart');

  }

  /**
   * @description Servicio para realizar login
   * @param formLogin Datos del usuario necesarios para hacer login
   * @returns
   */
  postSingupEndpoint(formLogin: any): Observable<any> {

    return this.http.post(this.gatewayUrl + '/v1/auth/register', formLogin);
  }

}
