import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-layout',
  templateUrl: './shopping-cart-layout.component.html',
  styleUrls: ['./shopping-cart-layout.component.scss']
})
export class ShoppingCartLayoutComponent implements OnInit {

  /**
   * Varaible que indica qu paso del proceso mostrar
   */
  step: number = 1;

  /**
   * Variable que indica que pasos se completaron
   */
  stepsCompleted: number = 0;

  constructor(
    private shoppingCartService: ShoppingCartService,
  ){}

  ngOnInit(): void {

  }


}
