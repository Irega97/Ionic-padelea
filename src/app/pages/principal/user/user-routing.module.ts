import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
  {
    path: 'torneos',
    loadChildren: () => import('../user/torneos/torneos.module').then(m => m.TorneosPageModule)
  },
  {
    path: 'amigos',
    loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule)
  },
  {
    path: 'modificar',
    loadChildren: () => import('src/app/pages/principal/user/updperfil/updperfil.module').then( m => m.UpdperfilPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UserPageRoutingModule {}