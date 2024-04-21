import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartLayoutComponent } from './pages/shopping-cart-layout/shopping-cart-layout.component';
import { PaymentsMetodsComponent } from './components/payments-metods/payments-metods.component';
import { CartProductsComponent } from './components/cart-products/cart-products.component';
import { ShoppingCartRoutingModule } from './shopping-cart-rounting.module';
import { CmmModule } from 'src/app/common/common.module';
import { DeliveryMethodComponent } from './components/delivery-method/delivery-method.component';



@NgModule({
  declarations: [
    ShoppingCartLayoutComponent,
    PaymentsMetodsComponent,
    CartProductsComponent,
    DeliveryMethodComponent
  ],
  imports: [
    CommonModule,
    CmmModule,
    ShoppingCartRoutingModule
  ]
})
export class ShoppingCartModule { }
