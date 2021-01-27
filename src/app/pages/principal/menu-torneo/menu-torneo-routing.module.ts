import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTorneoPage } from './menu-torneo.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTorneoPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('src/app/pages/principal/menu-torneo/torneo/torneo.module').then(m => m.TorneoPageModule)
      },
      {
        path: 'ranking',
        loadChildren: () => import('./ranking/ranking.module').then(m => m.RankingPageModule)
      }, 
      {
        path: 'vueltas',
        loadChildren: () => import('./vueltas/vueltas.module').then( m => m.VueltasPageModule)
      },
      {
        path: 'publicaciones',
        loadChildren: () => import('./publicaciones/publicaciones.module').then(m => m.PublicacionesPageModule)
      }, 
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTorneoPageRoutingModule {}
