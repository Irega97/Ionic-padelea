import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTorneoPage } from './menu-torneo.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTorneoPage,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/principal/menu-tabs/torneos/menu-torneo/torneo/torneo.module').then(m => m.TorneoPageModule)
      },
      /* {
        path: 'reglamento',
        loadChildren: () => import('src/app/pages/principal/menu-tabs/torneos/menu-torneo/torneo/reglamento.module').then(m => m.ReglamentoPageModule)
      }, */
      /* {
        path: 'ranking',
        loadChildren: () => import('src/app/pages/principal/menu-tabs/torneos/menu-torneo/torneo/ranking.module').then(m => m.RankingPageModule)
      }, */
      /* {
        path: 'vueltas',
        loadChildren: () => import('src/app/pages/principal/menu-tabs/torneos/menu-torneo/torneo/vueltas.module').then( m => m.VueltasPageModule)
      }, */
      {
        path: '',
        redirectTo: '/principal/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/principal/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTorneoPageRoutingModule {}
