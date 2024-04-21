import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsEcommerceComponent } from './pages/products-ecommerce/products-ecommerce.component';
import { ProductsSocialmediaComponent } from './pages/products-socialmedia/products-socialmedia.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ecommerce',
    pathMatch: 'full',
  },
  {
    path: 'ecommerce',
    component: ProductsEcommerceComponent,
  },
  {
    path: 'social_media',
    component: ProductsSocialmediaComponent,
  },
  {
    path: 'detail/:idproduct',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
