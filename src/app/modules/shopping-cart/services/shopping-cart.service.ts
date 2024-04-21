import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})

export class ShoppingCartService {

  /**
   * Variable que contiene la url del gateway
   */
  gatewayUrl: string;

  constructor(private http: HttpClient) {

    // Seteamos el la url base
    this.gatewayUrl = environment.CC_GATEWAY_URL;

  }

  /**
   * @description Servicio para listar los productos que se encuentran en el carrito
   * @returns
   */
  getCartProductsList(): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/profile/getCart');

  }

  /**
   * @description Servicio para listar los productos que se encuentran en el carrito
   * @returns
   */
  getPayMethodsList(): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/profile/getCart');

  }

  /**
   * @description Servicio para listar los productos que se encuentran en el carrito
   * @returns
   */
  postPaymentData(): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/profile/getCart');

  }

  /**
   * @description Servicio para quitar un producto que se encuentran en el carrito
   * @param idProducts arreglo de ids de los productos que se desean quitar
   * @returns
   */
  deleteCartProductsList(idProducts: string[]): Observable<any> {

    return this.http.delete(this.gatewayUrl + '/v1/profile/deleteCart', {
      body: {
        idProducts
      }
    });

  }

}
