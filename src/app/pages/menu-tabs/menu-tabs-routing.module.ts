import { AuthGuard } from './../../shared/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuTabsPage } from './menu-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: MenuTabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/principal/principal.module').then(m => m.PrincipalPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../home/buscador/buscador.module').then(m => m.BuscadorPageModule)
      },
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
  exports: [RouterModule]
})
export class MenuTabsPageRoutingModule {}
