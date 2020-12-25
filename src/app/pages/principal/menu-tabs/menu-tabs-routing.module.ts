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
        loadChildren: () => import('src/app/pages/principal/menu-tabs/home/principal.module').then(m => m.PrincipalPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('src/app/pages/principal/menu-tabs/buscador/buscador.module').then(m => m.BuscadorPageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('src/app/pages/principal/menu-tabs/chats/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'torneos',
        loadChildren: () => import('src/app/pages/principal/menu-tabs/torneos/torneos.module').then( m => m.TorneosPageModule)
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
