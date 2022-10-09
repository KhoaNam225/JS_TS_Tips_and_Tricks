import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from './code-block/code-block.component';
import { HighLightModule } from '../highlight.module';

@NgModule({
  declarations: [CodeBlockComponent],
  imports: [CommonModule, HighLightModule],
  exports: [CodeBlockComponent],
})
export class SharedModule {}
