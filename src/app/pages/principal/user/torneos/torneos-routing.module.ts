import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TorneosPage } from './torneos.page';

const routes: Routes = [
  {
    path: '',
    component: TorneosPage
  },
  {
    path: 'torneo',
    children: [
      {
        path: ':name',
        loadChildren: () => import('../../menu-tabs/torneos/menu-torneo/torneo/torneo.module').then(m => m.TorneoPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneosPageRoutingModule {}
