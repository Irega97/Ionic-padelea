import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicacionesPage } from './publicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: PublicacionesPage
  },
  {
    path: ':id/comentarios',
    loadChildren: () => import('../../menu-tabs/home/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicacionesPageRoutingModule {}
