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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
