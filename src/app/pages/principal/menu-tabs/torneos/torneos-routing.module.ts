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
        loadChildren: () => import('./menu-torneo/torneo/torneo.module').then( m => m.TorneoPageModule)
      }
    ]
  },
  {
    path: 'new',
    loadChildren: () => import('./new-torneo/new-torneo.module').then( m => m.NewTorneoPageModule)
  },
  {
    path: 'menu-torneo',
    loadChildren: () => import('./menu-torneo/menu-torneo.module').then( m => m.MenuTorneoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneosPageRoutingModule {}
