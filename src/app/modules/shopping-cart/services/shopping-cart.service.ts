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
   * @description Servicio para listar los metodos de pagos para que el usuario escoja que como pagar
   * @returns
   */
  getPayMethodsList(): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/list/paymethods');

  }

  /**
   * @description Servicio para crear una orden con los datos de pago
   * @param payData datos del pago
   * @returns
   */
  createOrder(payData: any, sendMethod: any): Observable<any> {

    return this.http.post(this.gatewayUrl + '/v1/operation/order', {
      payData,
      sendMethod
    });

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
