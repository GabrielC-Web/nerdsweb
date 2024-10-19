import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductListFilterModel, OrdersFilterModel } from 'src/app/core/reducer/module.models';
import { environment } from 'src/environments/environment';
import { ProductCatalogModel } from '../models/products.models';

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
   * @description Servicio para optener todos los productos del vendedor
   * @param filterData Datos utiles para la funcion de busqueda de productos
   * @returns
   */
  getUserProducts(filterData: ProductListFilterModel): Observable<any> {

    let params = {}

    // Itero por cada uno de los mensajes de error que se indiquen
    for( const [key, value] of Object.entries(filterData)) {

      if(value) {

        // Se asigna al objeto que se desea mandar en los parametros
        Object.assign(params, {[key]: value});

      }

    }

    return this.http.get(this.gatewayUrl + '/v1/list/products', {params});

  }

  /**
   * @description Servicio para optener el detalle de un producto
   * @param idProduct id del producto
   * @returns
   */
  getUserProductDetail(idProduct: string): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/details/product', {params:{
      idProduct: idProduct
    }});

  }

  /**
   * @description Servicio para optener todas las categorias de los productos
   * @param name Nombre de la categoria
   * @returns
   */
  getProductsCategoryList(name: string): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/list/categories', {params:{
      name
    }});

  }

  /**
   * @description Servicio para crear categorias para los productos
   * @param name Nombre de la categoria
   * @returns
   */
  createCategoryProduct(name: string): Observable<any> {

    return this.http.post(this.gatewayUrl + '/v1/details/category', {
      name
    });

  }

  /**
   * @description Servicio para elimnar cateogrias de productos
   * @param idCategory id de la categoria que se quiere eliminar
   * @returns
   */
  deleteCategoryProduct(idCategory: string): Observable<any> {

    return this.http.delete(this.gatewayUrl + '/v1/details/category');

  }

  /**
   * @description Servicio para optener todos los productos del vendedor
   * @param filterData Datos utiles para la funcion de busqueda de productos
   * @returns
   */
  getProductsTypeList(): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/list/catalog?catalog=type');

  }

  /**
   * @description Servicio para agregar un producto del vendedor
   * @param formData Datos del producto en cuestion
   * @returns
   */
  addUserProduct(formData: ProductCatalogModel): Observable<any> {

    return this.http.post(this.gatewayUrl + '/v1/operation/product', formData);

  }

  /**
   * @description Servicio para editar un producto del vendedor
   * @param formData Datos actualizados del producto
   * @returns
   */
  putUserProduct(formData: ProductCatalogModel): Observable<any> {

    return this.http.put(this.gatewayUrl + '/v1/operation/product', formData);

  }

  /**
   * TODO - ver requisitos para que funcione
   * @description Servicio para eliminar un producto del vendedor
   * @param
   * @returns
   */
  deleteUserProduct(): Observable<any> {

    return this.http.delete(this.gatewayUrl + '/v1/operation/product');

  }

  /**
   * @description Servicio para optener todas las ordenes del vendedor
   * @param filterData Datos utiles para la funcion de busqueda de productos
   * @returns
   */
  getUserOrders(filterData: OrdersFilterModel): Observable<any> {

    let params = {}

    // Itero por cada uno de los mensajes de error que se indiquen
    for( const [key, value] of Object.entries(filterData)) {

      if(value) {

        // Se asigna al objeto que se desea mandar en los parametros
        Object.assign(params, {[key]: value});

      }

    }

    return this.http.get(this.gatewayUrl + '/v1/list/orders', {params});

  }

  /**
   * @description Servicio para obtener el detalle de una orden
   * @param idOrder id de la orde de la cual se quiere obtener el detalle
   * @returns
   */
  getOrderDetail(idOrder: string): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/details/order', {
      params: {
        idOrder
      }
    });
  }

  /**
   * Funcion para validar/rexhazar una orden
   * @param idOrder Id de la orden a evaluar
   * @param aprove Resultado de la evaluacion
   * @returns
   */
  validateOrder(formData: any): Observable<any> {

    let params = {}

    // Itero por cada uno de los mensajes de error que se indiquen
    for( const [key, value] of Object.entries(formData)) {

      if(value) {

        // Se asigna al objeto que se desea mandar en los parametros
        Object.assign(params, {[key]: value});

      }

    }

    return this.http.put(this.gatewayUrl + '/v1/operation/order', params)
  }

  /**
   * TODO - Crear e implementar
   * @description Servicio para optener todos los usuarios del vendedor
   * @param formLogin Datos del usuario necesarios para hacer login
   * @returns
   */
  getUserClients(): Observable<any> {

    return this.http.get(this.gatewayUrl + '/v1/profile/getCart');

  }

}
