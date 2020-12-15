import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TorneoPage } from './torneo.page';

const routes: Routes = [
  {
    path: '',
    component: TorneoPage
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-torneo/admin-torneo.module').then( m => m.AdminTorneoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TorneoPageRoutingModule {}
