import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

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
  postLoginEndpoint(formLogin: any): Observable<any> {

    return this.http.post(this.gatewayUrl + '/v1/auth/login', formLogin);
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
