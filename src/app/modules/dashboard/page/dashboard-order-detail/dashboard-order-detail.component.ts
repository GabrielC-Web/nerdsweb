import { Component, OnInit } from '@angular/core';
import { OrderDetailModel, ProductVariantModel } from 'src/app/modules/shopping-cart/models/shopping-cart.model';
import { NerdsWebIsotipo } from 'src/assets/images/images-routes';
import { OrderStatus } from '../../models/orders.model';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { typeProducts } from '../../models/products.models';

@Component({
  selector: 'pag-dashboard-order-detail',
  templateUrl: './dashboard-order-detail.component.html',
  styleUrls: ['./dashboard-order-detail.component.scss']
})
export class DashboardOrderDetailComponent implements OnInit {

  /**
   * Imagenes
   */
  nerdsWebIsotipo: string = NerdsWebIsotipo;

  /**
   * Variable que indica si es necesario mostrar la informacion del envio
   */
  showSendInfo: boolean = false;

  /**
   * Variable que contiene el detalle de la orden del usuario
   */
  orderDetail!: OrderDetailModel;

  /**
   * distintos estsuis de la orden
   */
  orderStatus = OrderStatus;

  /**
   * Varianble qu econtiene la informacion de la agencia de envios usada
   */
  shippingAgency: any;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    public location: Location
  ) {}

  ngOnInit(): void {

    this.route.params
      .subscribe(params => {

        //Si en la ruta se paso el id de la orden
        if(params['idOrder']){
          // Usamos la funcion apra pedir el detalle de la orden
          this.getOrderDetail(params['idOrder']);
        }

        else{
          this.location.back();
        }

      });

  }

  /**
   * Funcion para obtener el detalle de una orden
   */
  getOrderDetail(idOrder: string) {
    this.dashboardService.getOrderDetail(idOrder).subscribe({
      next: (response: any) => {

        this.orderDetail = response.data;

        this.showSendInfo = this.showSendMethod();

        if(this.showSendInfo && this.orderDetail.sendMethod) {
          this.setShippingAgency(this.orderDetail.sendMethod.agency);
        };

      },
      error: (error) => {},
    });

  }

  /**
   * Funcion para el calculo del monto a mostrar
   */
  productAmount(index: number): number{

    // Buscamos el producto al que queremos calcular el monto
    let product = this.orderDetail.productList[index];

    // Calculamos el monto del precio dato por back multiplicado por la cantidad definida por el usuario
    let totalAmount = product.amount * +product.quantity;

    // Si el producto tiene un precio extra lo sumamos
    if(product.extraAmount){
      totalAmount = totalAmount + product.extraAmount;
    };

    // Si el producto tiene un descuento lo restamos
    if(product.discount){
      totalAmount = totalAmount - product.discount;
    }

    // Retornamos el monto
    return totalAmount;

  }

  /**
   * Funcion que determina si es necesario mostrar la informacion de encio segun los productos
   */
  showSendMethod(): boolean{

    return this.orderDetail.productList.filter(
      (product: ProductVariantModel) => product.type == typeProducts.physical
    ).length > 0;

  }

  /**
   * Funcion para definir la agencia de envios usada
   */
  setShippingAgency(idAgency: string){

    switch (idAgency) {
      case "1":
        this.shippingAgency =
        {
          "logo": "https://mrwve.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoMrw.c8eda858.png&w=256&q=75",
          "name": "MRW",
          "idShippingAgency": "1",
        };
        break;
      case "2":
        this.shippingAgency =
        {
          "logo": "https://zoom.red/wp-content/uploads/2021/01/Logo-Zoom-Registrado.png",
          "name": "Zoom",
          "idShippingAgency": "2",
        };
        break;
      case "3":
        this.shippingAgency =
        {
          "logo": "https://www.portal.domesa.com.ve/wp-content/uploads/2024/03/logo-domesa.jpeg",
          "name": "Domesa",
          "idShippingAgency": "3",
        };
        break;
    }

  }

}
