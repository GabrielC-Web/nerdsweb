import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './pages/base-layout/base-layout.component';
import { CmmModule } from 'src/app/common/common.module';
import { BaseRoutingModule } from './base-routing.module';
import { BaseHeaderComponent } from './components/base-header/base-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShoppingFloatButtonComponent } from './components/shopping-float-button/shopping-float-button.component';



@NgModule({
  declarations: [
    BaseLayoutComponent,
    BaseHeaderComponent,
    FooterComponent,
    ShoppingFloatButtonComponent
  ],
  imports: [
    CommonModule,
    CmmModule,
    BaseRoutingModule
  ]
})
export class BaseModule { }
