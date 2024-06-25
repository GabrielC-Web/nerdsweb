import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartLayoutComponent } from './pages/shopping-cart-layout/shopping-cart-layout.component';
import { OrderDetailLayoutComponent } from './pages/order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartLayoutComponent,
  },
  {
    path: 'order/:idOrder',
    component: OrderDetailLayoutComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule { }
