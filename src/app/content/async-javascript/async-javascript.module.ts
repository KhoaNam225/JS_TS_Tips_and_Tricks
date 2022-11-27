import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsyncJavascriptRoutingModule } from './async-javascript-routing.module';
import { AsyncJavaScriptComponent } from './async-java-script/async-java-script.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AsyncJavaScriptComponent],
  imports: [CommonModule, AsyncJavascriptRoutingModule, SharedModule],
})
export class AsyncJavascriptModule {}
