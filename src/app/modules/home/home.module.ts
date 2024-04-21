import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './pages/home-layout/home-layout.component';
import { CmmModule } from 'src/app/common/common.module';
import { HomeRoutingModule } from './home-routing.module';
import { ProductCOntainerComponent } from './components/product-container/product-container.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';



@NgModule({
  declarations: [
    HomeLayoutComponent,
    ProductCOntainerComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    CmmModule,
    HomeRoutingModule
  ],
  exports: [
    ContactFormComponent
  ]
})
export class HomeModule { }
