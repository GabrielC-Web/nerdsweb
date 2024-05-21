import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ImagesService {

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
  postImage(file: Blob) {

    const formData = new FormData();

    formData.append('key', file);

    return this.http.post(this.gatewayUrl + '/v1/service/img', formData);

  }

}
