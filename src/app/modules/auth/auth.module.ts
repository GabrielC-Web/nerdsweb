import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { AuthSingupComponent } from './components/auth-singup/auth-singup.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { CmmModule } from 'src/app/common/common.module';
import { AuthRoutingModule } from './auth.routing.module';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    AuthSingupComponent,
    AuthLoginComponent
  ],
  imports: [
    CommonModule,
    CmmModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
