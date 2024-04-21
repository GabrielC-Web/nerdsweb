import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddProductToShoppingCardModel } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})

export class Productservice {

  /**
   * Variable que contiene la url del gateway
   */
  gatewayUrl: string;

  constructor(private http: HttpClient) {

    // Seteamos el la url base
    this.gatewayUrl = environment.CC_GATEWAY_URL;

  }

  /**
   * @description Servicio para listar los productos
   * @param category Nombre de la categoria por la cual se desea filtrar
   * @returns
   */
  getProductsList(category?: string, idService?: string): Observable<any> {

    // Creamos el objeto que se desea mandar en los parametros
    let params = {};

    // Si hay algun parametro de emails a los que se desea enviar el reporte
    if (category) {
      Object.assign(params, { category });
    }

    // Si hay algun parametro de emails a los que se desea enviar el reporte
    if (idService) {
      Object.assign(params, { idService });
    }

    return this.http.get(this.gatewayUrl + '/v1/list/products', {
      params
    });

  }

  /**
   * @description Servicio para listar los productos
   * @returns
   */
  getTemplateList(): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/list/templates');

  }

  /**
   * @description Servicio para agregar productos al carrito de compra
   * @param productData Los datos del producto que se desea gregar al carrito
   * @returns
   */
  postNewProductsToShoppingCard(productData?: AddProductToShoppingCardModel): Observable<any> {

    return this.http.post(this.gatewayUrl + '/v1/profile/addTocart', productData);

  }

}
