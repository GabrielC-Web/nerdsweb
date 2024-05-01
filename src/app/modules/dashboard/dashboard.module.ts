import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './page/dashboard-layout/dashboard-layout.component';
import { DashboardServicesComponent } from './components/dashboard-services/dashboard-services.component';
import { DashboardPaysComponent } from './components/dashboard-pays/dashboard-pays.component';
import { DashboardUserInformactionComponent } from './components/dashboard-user-informaction/dashboard-user-informaction.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { CmmModule } from 'src/app/common/common.module';
import { DashboardCuponDialogComponent } from './dialogs/dashboard-cupon-dialog/dashboard-cupon-dialog.component';
import { DashboardCatalogueComponent } from './components/dashboard-catalogue/dashboard-catalogue.component';
import { DashboardBackofficesOptionsComponent } from './components/dashboard-backoffices-options/dashboard-backoffices-options.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from 'src/app/core/shared/shared.module';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardServicesComponent,
    DashboardPaysComponent,
    DashboardUserInformactionComponent,
    DashboardCuponDialogComponent,
    DashboardCatalogueComponent,
    DashboardBackofficesOptionsComponent
  ],
  imports: [
    CommonModule,
    CmmModule,
    SharedModule,
    DashboardRoutingModule,
    NgxChartsModule,
  ]
})
export class DashboardModule { }
