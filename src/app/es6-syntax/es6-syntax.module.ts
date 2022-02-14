import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ES6SyntaxRoutingModule } from './es6-syntax-routing.module';
import { ES6SyntaxComponent } from './es6-syntax.component';
import { HighLightModule } from '../highlight.module';
import { SharedModule } from '../code-block/shared.module';

@NgModule({
  declarations: [ES6SyntaxComponent],
  imports: [
    CommonModule,
    ES6SyntaxRoutingModule,
    HighLightModule,
    SharedModule,
  ],
})
export class ES6SyntaxModule {}
