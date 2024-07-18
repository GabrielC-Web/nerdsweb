import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Productservice } from '../../services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { ProductModel } from '../../models/products.model';
import { Router } from '@angular/router';

@Component({
  selector: 'cmp-product-card-info',
  templateUrl: './product-card-info.component.html',
  styleUrls: ['./product-card-info.component.scss']
})
export class ProductCardInfoComponent implements OnInit {
  //? Lógica de lifecicle

  /**
   * Desactiva la subscripción de observables
   */
  $unsubscribe = new Subject<void>();

  /**
   * Variable que guarda el arreglo con todos los productos
   */
  productsList: ProductModel[] = [];

  /**
   * Input que recive el id del módulo que se va a utilizar
   */
  @Input() category: string = '';
  /**
   * Input que recive el id del módulo que se va a utilizar
   */
  @Output() productVariants: EventEmitter<any> = new EventEmitter();

  constructor(
    private productservice: Productservice,
    private router: Router
  ){}

  ngOnInit(): void {

    // Ejecutamos la funcion para solicitar el listado de productos
    this.getProductsList();

  }

  /**
   * Funcion para solicitar los productos disponibles
   */
  getProductsList() {

    // Llamo al servicio
    this.productservice.getProductsList(this.category)
      .pipe(
        // Indicamos que esta funcion se ejecutara hasta que el indique lo contario
        takeUntil(this.$unsubscribe)
      )
      .subscribe({
        next: (response) => {

          // Accedemos data de la respuesta
          response = (response as any).data;

          this.productsList = response.items;

          this.productVariants.emit(this.productsList[0].variants);

        },
        error: (error) => {},
      });
  }

  /**
   * Funcion para navegar a la vosta de detalle de los productos
   */
  navigateToProductDetail(idProduct: string){

    // Navegamos a la ruta de detalle colocando en la ruta el id del producto indicado
    this.router.navigate(['products/detail/' + idProduct]);

  }

}
