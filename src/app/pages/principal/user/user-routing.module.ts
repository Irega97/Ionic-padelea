import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: ':id',
    component: UserPage,
    children: [
          {
            path: 'amigos',
            loadChildren: () => import('./amigos/amigos.module').then(m => m.AmigosPageModule)
          },
          {
            path: 'torneos',
            loadChildren: () => import('./torneos/torneos.module').then(m => m.TorneosPageModule)
          }
          /*{
            path: 'informacion',
            loadChildren: 
          }*/
        ]
  },
  {
    path: 'modperfil',
    loadChildren: () => import('src/app/pages/principal/user/modperfil/modperfil.module').then(m => m.ModperfilPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
