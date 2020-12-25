import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  },
    /* {
      path: 'amigos',
      loadChildren: () => import('../user/amigos/amigos.module').then(m => m.AmigosPageModule)
    }, */
  {
    path: 'torneos',
    loadChildren: () => import('../user/torneos/torneos.module').then(m => m.TorneosPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
