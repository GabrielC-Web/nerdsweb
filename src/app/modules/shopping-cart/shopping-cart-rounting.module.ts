import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartLayoutComponent } from './pages/shopping-cart-layout/shopping-cart-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartLayoutComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule { }
