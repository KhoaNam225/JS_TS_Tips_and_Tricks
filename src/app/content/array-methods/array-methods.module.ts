import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArrayMethodsRoutingModule } from './array-methods-routing.module';
import { ArrayMethodsComponent } from './array-methods.component';
import { HighLightModule } from '../../highlight.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ArrayMethodsComponent],
  imports: [
    CommonModule,
    ArrayMethodsRoutingModule,
    HighLightModule,
    SharedModule,
  ],
})
export class ArrayMethodsModule {}
