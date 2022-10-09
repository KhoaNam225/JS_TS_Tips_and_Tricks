import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArrayMethodsComponent } from './array-methods.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ArrayMethodsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArrayMethodsRoutingModule { }
