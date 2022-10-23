import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {
  HighlightModule,
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
} from 'ngx-highlightjs';
import { environment } from '../environments/environment';
import {
  CodeExecutionAPIKeyInjectionToken,
  CodeExecutionBaseUrlInjectionToken,
  CodeExecutionHostInjectionToken,
} from './shared/services/code-execution.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighlightModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        themePath: 'node_modules/highlight.js/styles/github.css',
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },
    {
      provide: CodeExecutionAPIKeyInjectionToken,
      useValue: environment.rapidAPIKey,
    },
    {
      provide: CodeExecutionBaseUrlInjectionToken,
      useValue: environment.rapidAPIBaseURL,
    },
    {
      provide: CodeExecutionHostInjectionToken,
      useValue: environment.rapidAPIHost,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
