import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsyncJavaScriptComponent } from './async-java-script/async-java-script.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AsyncJavaScriptComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsyncJavascriptRoutingModule {}
