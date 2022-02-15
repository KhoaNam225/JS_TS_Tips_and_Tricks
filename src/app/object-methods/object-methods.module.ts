import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectMethodsRoutingModule } from './object-methods-routing.module';
import { ObjectMethodsComponent } from './object-methods.component';
import { HighLightModule } from '../highlight.module';
import { SharedModule } from '../code-block/shared.module';

@NgModule({
  declarations: [ObjectMethodsComponent],
  imports: [
    CommonModule,
    ObjectMethodsRoutingModule,
    HighLightModule,
    SharedModule,
  ],
})
export class ObjectMethodsModule {}
