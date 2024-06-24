import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductModel } from 'src/app/modules/products/models/products.model';
import { ShoppingCartService } from 'src/app/modules/shopping-cart/services/shopping-cart.service';

@Component({
  selector: 'cmp-shopping-float-button',
  templateUrl: './shopping-float-button.component.html',
  styleUrls: ['./shopping-float-button.component.scss']
})
export class ShoppingFloatButtonComponent implements OnInit {

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe: Subject<void> =  new Subject();

  //? Información de utilidad

  /**
   * Listado de bancos
   */
  productsList: ProductModel[] = []

  constructor(
    public router: Router,
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

  /**
   * Funcion para dirigir al usuario a su carrito de compras
   */
  goToShoppingCart() {

    // Redirigo al dashboard (descomentar)
    this.router.navigate(['shopping-cart']);

  }

}
