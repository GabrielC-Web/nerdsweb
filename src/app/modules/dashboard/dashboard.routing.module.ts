import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './page/dashboard-layout/dashboard-layout.component';
import { CmmAuthGuard } from 'src/app/common/guards/auth.guard';
import { DashboardCatalogueComponent } from './page/dashboard-catalogue/dashboard-catalogue.component';
import { DashboardProductComponent } from './page/dashboard-product/dashboard-product.component';
import { DashboardOrdersComponent } from './page/dashboard-orders/dashboard-orders.component';
import { DashboardOrderDetailComponent } from './page/dashboard-order-detail/dashboard-order-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [CmmAuthGuard],
    component: DashboardLayoutComponent,
    pathMatch: 'full',
  },
  {
    path: 'cataloge',
    canActivate: [CmmAuthGuard],
    component: DashboardCatalogueComponent,
    pathMatch: 'full',
  },
  {
    path: 'cataloge/product',
    canActivate: [CmmAuthGuard],
    component: DashboardProductComponent,
    pathMatch: 'full',
  },
  {
    path: 'orders',
    canActivate: [CmmAuthGuard],
    component: DashboardOrdersComponent,
    pathMatch: 'full',
  },
  {
    path: 'orders/detail/:idOrder',
    canActivate: [CmmAuthGuard],
    component: DashboardOrderDetailComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
