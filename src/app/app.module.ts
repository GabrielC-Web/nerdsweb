import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { metaReducers } from './core/reducer/index';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { CmmModule } from './common/common.module';
import { CmmAuthGuard } from './common/guards/auth.guard';
import { CmmHttpInterceptor } from './common/interceptors/http.interceptor';
import { CmmDataService } from './common/services/data.service';
import { CmmDialogService } from './common/services/dialogs.service';
import { CmmTimerSessionService } from './common/services/timer-session.service';
import { reducers } from './core/reducer';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    CmmModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    })
  ],
  providers: [
    CmmDataService,
    CmmTimerSessionService,
    CmmDialogService,
    CmmAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CmmHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [],
})
export class AppModule {}
