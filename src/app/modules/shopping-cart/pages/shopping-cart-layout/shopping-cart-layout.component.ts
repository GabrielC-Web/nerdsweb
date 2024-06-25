import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subject, takeUntil } from 'rxjs';
import { ProductVariantModel } from '../../models/shopping-cart.model';
import { typeProducts } from 'src/app/modules/dashboard/models/products.models';

@Component({
  selector: 'app-shopping-cart-layout',
  templateUrl: './shopping-cart-layout.component.html',
  styleUrls: ['./shopping-cart-layout.component.scss']
})
export class ShoppingCartLayoutComponent implements OnInit {

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> =  new Subject();

  /**
   * Varaible que indica qu paso del proceso mostrar
   */
  step: number = 1;

  /**
   * Variable que indica que pasos se completaron
   */
  stepsCompleted: number = 0;

  /**
   * Listado de productos que se encuentran en el carrito
   */
  productsList: ProductVariantModel[] = [];

  /**
   * Listado de metodos de envios disponibles para la orden
   */
  deliveryMethodsList: any[] = [];

  /**
   * Indica si es necesario agregar data de envio
   */
  deliveryRequired: boolean = true;

  constructor(
    private shoppingCartServices: ShoppingCartService,
  ){}

  ngOnInit(): void {

    // Ejecutamos la funcion para obtener el listado de productos
    this.getProductsList();

  }


  /**
   * Obtiene el listado de bancos
   */
  getProductsList() {

    // let data = {
    //   "sendMethods": [
    //             {
    //                 "idMethod": '1',
    //                 "deliveryMethodName": "Delivery (Caracas)",
    //                 "config":{
    //                   "text": [
    //                     {
    //                       "form": "direction",
    //                       "label": "Direccion de envio",
    //                       "placeholder": "Ej: 44 Av. Este 0, Caracas 1011, Distrito Capital",
    //                       "regex": "",
    //                       "onlyNumber": false,
    //                       "minLength": 10,
    //                       "maxLength": 50,
    //                       "required": true,
    //                       "Value": ""
    //                     }
    //                   ]
    //                 },
    //             },
    //             {
    //                 "idMethod": '2',
    //                 "deliveryMethodName": "Envio nacional",
    //                 "config":{
    //                   "selects": [
    //                     {
    //                       "form": "agency",
    //                       "value": "",
    //                       "key": "idShippingAgency",
    //                       "name": "name",
    //                       "imageSearchKey": "logo",
    //                       "label": "Agencia de envio",
    //                       "placeholder": "Ej: MRW",
    //                       "list": [
    //                         {
    //                           "logo": "https://mrwve.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoMrw.c8eda858.png&w=256&q=75",
    //                           "name": "MRW",
    //                           "idShippingAgency": "1",
    //                         },
    //                         {
    //                           "logo": "https://zoom.red/wp-content/uploads/2021/01/Logo-Zoom-Registrado.png",
    //                           "name": "Zoom",
    //                           "idShippingAgency": "2",
    //                         },
    //                         {
    //                           "logo": "https://www.portal.domesa.com.ve/wp-content/uploads/2024/03/logo-domesa.jpeg",
    //                           "name": "Domesa",
    //                           "idShippingAgency": "3",
    //                         },
    //                       ],
    //                     },
    //                   ],
    //                   "directions": [
    //                     {
    //                       "form": "direction",
    //                       "value": "",
    //                       "key": "direccion",
    //                       "name": "direccion",
    //                       "label": "Direccion del local",
    //                       "placeholder": "Ej: AV LIBERTADOR QUINTA MRW, AL LADO DE AUVISIËN C.A. DETRAS DEL RESTAURANT GRAN YEN, SUBIENDO POR LA TORRE POLAR. LOS CAOBOS.",
    //                     },
    //                   ]
    //                 },
    //             },
    //             {
    //                 "idMethod": '3',
    //                 "deliveryMethodName": "Recoger en el local",
    //                 "config":{
    //                   "map": [
    //                     {
    //                       "form": "direction",
    //                       "value": "",
    //                       "key": "direction",
    //                       "name": "direction",
    //                       "label": "Direccion del local",
    //                       "placeholder": "Ej: Centro Comercial Plaza Esmeralda, colinas de san diego, La esmeralda",
    //                       "list": [
    //                         {
    //                           "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.3313811433745!2d-66.54634118527969!3d10.474521367557937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2babc9f029ddeb%3A0xc746c073104859ae!2sTealca!5e0!3m2!1ses!2sve!4v1649791546454!5m2!1ses!2sve",
    //                           "direction": "C.C. GALERIAS EL PUEBLO, LOCAL 16, AV. SUCRE, CATIA , CARACAS.",
    //                         },
    //                         {
    //                           "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.3313811433745!2d-66.54634118527969!3d10.474521367557937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2babc9f029ddeb%3A0xc746c073104859ae!2sTealca!5e0!3m2!1ses!2sve!4v1649791546454!5m2!1ses!2sve",
    //                           "direction": "Centro Comercial Plaza Esmeralda, colinas de san diego, La esmeralda",
    //                         },
    //                         {
    //                           "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.3313811433745!2d-66.54634118527969!3d10.474521367557937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2babc9f029ddeb%3A0xc746c073104859ae!2sTealca!5e0!3m2!1ses!2sve!4v1649791546454!5m2!1ses!2sve",
    //                           "direction": "CALLE NORTE 3 (AV PANTEON) ENTRE LA ESQUINA DE ESPERANZA Y CARIDAD, EDIFICIO ANTONIETA, LOCAL N3 PB, SECTOR LA PANTEON. DISTRITO CAPITAL.",
    //                         },
    //                       ]
    //                     },
    //                   ]
    //                 },
    //             },
    //   ],
    //   "row": [
    //             {
    //                 "productName": "Tienda ilimitada",
    //                 "brand": "nerdsweb",
    //                 "description": "Una e commerce potente y altamente competitiva para ti",
    //                 "amount": 350,
    //                 "extraAmount": 150,
    //                 "characteristics": [
    //                     "todas las funciones del plan medio",
    //                     "Hosting y Dominio",
    //                     "Diseño de sitio",
    //                     "Edición fotográfica (fotos enviadas por cliente)",
    //                     "SEO",
    //                     "Productos ilimitados",
    //                     "Categorías ilimitadas",
    //                     "Área de chat",
    //                     "Atención al cliente prioritaria"
    //                 ],
    //                 "type": "66071cb992f309c9a63017d8",
    //                 "category": [
    //                     "ecommerce",
    //                     "subscription"
    //                 ],
    //                 "discount": 0,
    //                 "image": [
    //                     "https://i.ibb.co/MZdYXZD/TEMPLATE-REPUESTOS-NERDSWEB.jpg"
    //                 ],
    //                 "visible": true,
    //                 "status": "ACTIVE",
    //                 "idProduct": "66227b9f7fdb4313de67b5b1",
    //                 "name": "Plantilla de repuestos",
    //                 "color": "",
    //                 "startDate": null,
    //                 "endDate": null,
    //                 "idVariant": "66227b9f7fdb4313de67b5b8",
    //                 "variant": true,
    //                 "quantity": "1",
    //                 "template": "",
    //                 "cupon": ""
    //             }
    //   ],
    //   "totalAmount": 500,
    //   "count": 1
    // }

    // // Guardamos el listado de productos de la orden
    // this.productsList = data.row;
    // console.log(this.productsList);

    // // Verificamos si hay productos fisicos
    // this.deliveryRequired = this.productsList.filter(
    //   (product: any) => product.type == typeProducts.physical
    // ).length > 0;

    // // Guardamos el listado de metodos de envios disponibles en la orden
    // this.deliveryMethodsList = data.sendMethods;
    // console.log(this.deliveryMethodsList);

    // Hacemos la peticion a la api
    this.shoppingCartServices.getCartProductsList()
    .pipe(
      // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
      takeUntil(this.$unsubscribe)
    )
    .subscribe({
      next: (response: any) => {

        // Guardamos el listado de bancos en la variable indicada
        this.productsList = response.data.row;

        // Verificamos si hay productos fisicos
        this.deliveryRequired = this.productsList.filter(
          (product: any) => product.type == typeProducts.physical
        ).length > 0;

        // Guardamos el listado de metodos de envios disponibles en la orden
        this.deliveryMethodsList = response.data.sendMethods;

      },
      error: (error: any) => {}
    });

  }

}
