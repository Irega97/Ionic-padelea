import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VueltasPage } from './vueltas.page';

const routes: Routes = [
  {
    path: '',
    component: VueltasPage
  },
  {
    path: ':vuelta/:grupo',
    loadChildren: () => import('./partidos/partidos.module').then( m => m.PartidosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VueltasPageRoutingModule {}
