import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ProductVariantModel } from '../../models/shopping-cart.model';
import { CmmAlertToastrModel } from 'src/app/common/data/dialogs/models/dialogs.model';
import { CmmDialogService } from 'src/app/common/services/dialogs.service';

@Component({
  selector: 'cmp-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> =  new Subject();

  //? Información de utilidad

  /**
   * Listado de productos que se encuentran en el carrito
   */
  @Input() productsList: ProductVariantModel[] = [];

  /**
   * indica cuando pasar al siguiente paso
   */
  @Output() nextStep: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private cmmDialogsService: CmmDialogService,
    private shoppingCartServices: ShoppingCartService
    ){}

  ngOnInit(): void {}

  //? Métodos para obtener información de utilidad

  deleteProduct(id: string){

    // Hacemos la peticion a la api
    this.shoppingCartServices.deleteCartProductsList([id])
    .pipe(
      // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
      takeUntil(this.$unsubscribe)
    )
    .subscribe({
      next: (response: any) => {

        // Armamos la data de la alerta
        const messagesData: CmmAlertToastrModel = {
          typeIcon: 'success',
          text: response.message,
        };

        // Abrimos la alerta con el mensaje
        this.cmmDialogsService.CmmAlertToastr(messagesData);




      },
      error: (error: any) => {}
    });

  }

  /**
   * Funcion para reducir la cantidad por uno
   */
  minus(index: number) {

    if(Number(this.productsList[index].quantity) > 1) {
      this.productsList[index].quantity = Number(this.productsList[index].quantity) - 1;
    };

  }

  /**
   * Funcion para aumentar la cantidad
   */
  plus(index: number) {

    if(this.productsList[index].quantity) {
      this.productsList[index].quantity = Number(this.productsList[index].quantity) + 1;
    }
  }

  /**
   * Funcion para el calculo del monto a mostrar
   */
  productAmount(index: number): number{

    // Buscamos el producto al que queremos calcular el monto
    let product = this.productsList[index];

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
}
