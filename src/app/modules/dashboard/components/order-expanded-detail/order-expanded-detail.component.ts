import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CmmDataService } from 'src/app/common/services/data.service';
import { ProductVariantModel } from 'src/app/modules/shopping-cart/models/shopping-cart.model';
import { OrderStatus } from '../../models/orders.model';
import { typeProducts } from '../../models/products.models';
import { MatDialog } from '@angular/material/dialog';
import { ValidateOrderDialog } from '../../dialogs/validate-order-dialog/validate-order-dialog.component';

@Component({
  selector: 'cmp-order-expanded-detail',
  templateUrl: './order-expanded-detail.component.html',
  styleUrls: ['./order-expanded-detail.component.scss']
})
export class OrderExpandedDetailComponent implements OnChanges {
  /**
   * Variable que contiene el detalle de la orden del usuario
   */
  @Input() orderDetail: any;

  /**
   * Variable que indica si es necesario mostrar la informacion del envio
   */
  showSendInfo: boolean = false;

  /**
   * distintos estsuis de la orden
   */
  orderStatus = OrderStatus;

  /**
   * Variable que contiene la informacion de pago
   */
  paymentMethodInfo: any[] = [];

  /**
   * Imagen del comprobante
   */
  image: any;
  /**
   * Varianble qu econtiene la informacion de la agencia de envios usada
   */
  shippingAgency: any;

  constructor(
    public dialog: MatDialog,
    public dataService: CmmDataService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['orderDetail'].currentValue){

      // Itero por cada uno de los parametros del formulario
      for( const [key, value] of Object.entries(this.orderDetail.payData)) {

        let data: any = value;

        // Validamos que exista el parametro
        if(data && !data.value.includes('https://')) {
          this.paymentMethodInfo.push(value);
        }

        else if(data && data.value.includes('https://')){
          this.image = data;
        };

      };

      this.showSendInfo = this.showSendMethod();

      if(this.showSendInfo && this.orderDetail.sendMethod) {
        this.setShippingAgency(this.orderDetail.sendMethod.agency);
      };

    }

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

  /**
   * Funcion para descargar comprobantes
   * @param imageSelected data recibida del metodo de pago
   */
  async downloadImage(imageSelected: any) {
    const image = await fetch(imageSelected.value)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)

    const link = document.createElement('a')
    link.href = imageURL
    link.download = imageSelected.name + '_' + this.orderDetail.idOrder
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /**
   * Funcion aprobar/rechazar orden
   */
  validateOrder(aprove: boolean) {

    // abrimos el modal
    const dialogRef = this.dialog.open(
      ValidateOrderDialog, {
      width: '600px',
      autoFocus: false,
      disableClose: true,
      data: {aprove, idOrder: this.orderDetail.idOrder}
    });

  }

}
