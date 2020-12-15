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
        path: ':id',
        loadChildren: () => import('./torneo/torneo.module').then( m => m.TorneoPageModule)
      }
    ]
  },
  {
    path: 'new',
    loadChildren: () => import('./new-torneo/new-torneo.module').then( m => m.NewTorneoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneosPageRoutingModule {}
