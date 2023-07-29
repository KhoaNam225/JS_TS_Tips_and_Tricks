import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { HighLightModule } from '../highlight.module';
import { CodeBlockComponent } from './code-block/code-block.component';
import { CodeExecutionBlockComponent } from './code-execution-block/code-execution-block.component';
import { CodeExecutionResultComponent } from './code-execution-result/code-execution-result.component';
import { MarkdownContentParserComponent } from './markdown-content-parser/markdown-content-parser.component';

@NgModule({
  declarations: [
    CodeBlockComponent,
    CodeExecutionBlockComponent,
    CodeExecutionResultComponent,
    MarkdownContentParserComponent,
  ],
  imports: [
    CommonModule,
    HighLightModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    MarkdownModule.forChild(),
  ],
  exports: [
    CodeBlockComponent,
    CodeExecutionBlockComponent,
    MarkdownContentParserComponent,
  ],
})
export class SharedModule {}
