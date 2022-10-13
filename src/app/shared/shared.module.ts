import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from './code-block/code-block.component';
import { HighLightModule } from '../highlight.module';
import { CodeExecutionBlockComponent } from './code-execution-block/code-execution-block.component';

@NgModule({
  declarations: [CodeBlockComponent, CodeExecutionBlockComponent],
  imports: [CommonModule, HighLightModule],
  exports: [CodeBlockComponent],
})
export class SharedModule {}
