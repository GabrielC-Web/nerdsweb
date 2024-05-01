import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FilterFormComponent } from './filter-form/filter-form.component';
import { CmmModule } from 'src/app/common/common.module';



@NgModule({
  declarations: [
    FilterFormComponent
  ],
  imports: [
    CommonModule,
    CmmModule,
    NgxChartsModule,
  ],
  exports: [
    FilterFormComponent
  ]
})
export class SharedModule { }
