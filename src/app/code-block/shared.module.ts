import { NgModule } from '@angular/core';
import { HighLightModule } from '../highlight.module';
import { CodeBlockComponent } from './code-block.component';

@NgModule({
  declarations: [CodeBlockComponent],
  imports: [HighLightModule],
  exports: [CodeBlockComponent],
})
export class SharedModule {}
