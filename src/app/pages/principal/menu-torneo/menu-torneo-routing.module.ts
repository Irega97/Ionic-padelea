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
        loadChildren: () => import('src/app/pages/principal/menu-torneo/torneo/torneo.module').then(m => m.TorneoPageModule)
      },
      {
        path: 'reglamento',
        loadChildren: () => import('./reglamento/reglamento.module').then(m => m.ReglamentoPageModule)
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
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuTorneoPageRoutingModule {}
