import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
   * Listado de bancos
   */
  productsList: ProductVariantModel[] = [];

  /**
   * indica cuando pasar al siguiente paso
   */
  @Output() nextStep: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private cmmDialogsService: CmmDialogService,
    private shoppingCartServices: ShoppingCartService
    ){}

  ngOnInit(): void {

    // Ejecutamos la funcion para obtener el listado de productos
    this.getProductsList();

  }

  //? Métodos para obtener información de utilidad

  /**
   * Obtiene el listado de bancos
   */
  getProductsList() {

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
        console.log(this.productsList);

      },
      error: (error: any) => {}
    });

  }

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

        // Volvemos a pedir el listado de productos
        this.getProductsList();

      },
      error: (error: any) => {}
    });

  }

  /**
   * Funcion para reducir la cantidad por uno
   */
  minus(index: number) {

    if(this.productsList[index].quantity > 1) {
      this.productsList[index].quantity = this.productsList[index].quantity - 1;
    };

  }

  /**
   * Funcion para aumentar la cantidad
   */
  plus(index: number) {

    if(this.productsList[index].quantity) {
      this.productsList[index].quantity = this.productsList[index].quantity + 1;
    }
  }

}
