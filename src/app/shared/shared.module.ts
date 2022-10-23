import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from './code-block/code-block.component';
import { HighLightModule } from '../highlight.module';
import { CodeExecutionBlockComponent } from './code-execution-block/code-execution-block.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CodeBlockComponent, CodeExecutionBlockComponent],
  imports: [
    CommonModule,
    HighLightModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
  ],
  exports: [CodeBlockComponent, CodeExecutionBlockComponent],
})
export class SharedModule {}
