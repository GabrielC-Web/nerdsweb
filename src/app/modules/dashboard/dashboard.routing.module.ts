import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './page/dashboard-layout/dashboard-layout.component';
import { CmmAuthGuard } from 'src/app/common/guards/auth.guard';
import { DashboardCatalogueComponent } from './components/dashboard-catalogue/dashboard-catalogue.component';
import { DashboardProductComponent } from './components/dashboard-product/dashboard-product.component';

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
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
