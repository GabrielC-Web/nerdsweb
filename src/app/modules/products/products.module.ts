import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmmModule } from 'src/app/common/common.module';
import { ProductsRoutingModule } from './products.routing.module';
import { ProductsEcommerceComponent } from './pages/products-ecommerce/products-ecommerce.component';
import { ProductsSocialmediaComponent } from './pages/products-socialmedia/products-socialmedia.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductCardInfoComponent } from './components/product-card-info/product-card-info.component';
import { HomeModule } from '../home/home.module';



@NgModule({
  declarations: [
    ProductsEcommerceComponent,
    ProductsSocialmediaComponent,
    ProductDetailComponent,
    ProductCardInfoComponent
  ],
  imports: [
    CommonModule,
    CmmModule,
    HomeModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
