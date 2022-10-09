import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'es6-syntax',
    pathMatch: 'full',
    loadChildren: () =>
      import('./es6-syntax/es6-syntax.module').then(
        (module) => module.ES6SyntaxModule
      ),
  },
  {
    path: 'array-methods',
    pathMatch: 'full',
    loadChildren: () =>
      import('./array-methods/array-methods.module').then(
        (module) => module.ArrayMethodsModule
      ),
  },
  {
    path: 'object-methods',
    pathMatch: 'full',
    loadChildren: () =>
      import('./object-methods/object-methods.module').then(
        (module) => module.ObjectMethodsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
