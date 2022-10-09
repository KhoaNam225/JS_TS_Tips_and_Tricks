import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ES6SyntaxComponent } from './es6-syntax.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ES6SyntaxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ES6SyntaxRoutingModule {}
