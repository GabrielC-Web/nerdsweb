// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmmAuthGuard } from 'src/app/common/guards/auth.guard';
import { HomeLayoutComponent } from './pages/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CmmAuthGuard],
})
export class HomeRoutingModule {}
