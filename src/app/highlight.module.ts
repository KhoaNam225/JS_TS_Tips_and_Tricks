import { NgModule } from '@angular/core';
import {
  HIGHLIGHT_OPTIONS,
  HighlightModule,
  HighlightOptions,
} from 'ngx-highlightjs';

@NgModule({
  imports: [HighlightModule],
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
  ],
  exports: [HighlightModule],
})
export class HighLightModule {}
