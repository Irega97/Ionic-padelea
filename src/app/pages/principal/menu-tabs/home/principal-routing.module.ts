import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalPage
  },
  {
    path: ':id/comentarios',
    loadChildren: () => import('./comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalPageRoutingModule {}
