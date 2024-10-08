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

    return this.http.get(this.gatewayUrl + '/v1/list/shoppingcart');

  }

  /**
   * @description Servicio para editar la cantidad de un producto en el carrito
   * @param idProducts id del producto que se desea editar
   * @param count nueva cantidad del producto en el carrito
   * @returns
   */
  editCartProductCount(idProducts: number, count: number): Observable<any> {

    return this.http.put(this.gatewayUrl + 'v1/operation/shoppingcart', {
      body: {
        idProducts
      }
    });

  }

  /**
   * @description Servicio para quitar un producto que se encuentran en el carrito
   * @param idProducts arreglo de ids de los productos que se desean quitar
   * @returns
   */
  deleteCartProducts(idProducts: string[]): Observable<any> {

    return this.http.delete(this.gatewayUrl + 'v1/operation/shoppingcart', {
      body: {
        idProducts
      }
    });

  }

  /**
   * TODO - Crear e implementar
   * @description Servicio para listar los metodos de pagos para que el usuario escoja que como pagar
   * @returns
   */
  getPayMethodsList(): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/list/paymethods');

  }

  /**
   * @description Servicio para obtener el detalle de una orden
   * @param idOrder id de la orde de la cual se quiere obtener el detalle
   * @returns
   */
  getOrderDetail(idOrder: string): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/operation/user/order/detail', {
      params: {
        idOrder
      }
    });

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

}
