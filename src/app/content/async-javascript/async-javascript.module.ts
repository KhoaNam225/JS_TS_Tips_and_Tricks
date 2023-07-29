import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { AsyncJavaScriptComponent } from './async-java-script/async-java-script.component';
import { AsyncJavascriptRoutingModule } from './async-javascript-routing.module';

@NgModule({
  declarations: [AsyncJavaScriptComponent],
  imports: [
    CommonModule,
    AsyncJavascriptRoutingModule,
    SharedModule,
    MarkdownModule.forChild(),
  ],
})
export class AsyncJavascriptModule {}
