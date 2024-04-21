import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './page/dashboard-layout/dashboard-layout.component';
import { CmmAuthGuard } from 'src/app/common/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CmmAuthGuard],
    component: DashboardLayoutComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
