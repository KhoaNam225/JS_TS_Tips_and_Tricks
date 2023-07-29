import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HighlightModule,
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
} from 'ngx-highlightjs';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import {
  CodeExecutionAPIKeyInjectionToken,
  CodeExecutionBaseUrlInjectionToken,
  CodeExecutionHostInjectionToken,
} from './shared/services/code-execution.service';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.code = (code: string, language: string) => {
    return `<pre class="language-${language} code-block"><code class="language-${language}">${code}</code></pre>`;
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HighlightModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
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
