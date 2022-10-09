import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'content',
    pathMatch: 'prefix',
    loadChildren: () =>
      import('./content/content.module').then((module) => module.ContentModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'es6-syntax',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
