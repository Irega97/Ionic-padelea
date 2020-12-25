import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmigosPage } from './amigos.page';

const routes: Routes = [
  {
    path: '',
    component: AmigosPage
  },
  {
    path: 'user',
    children: [
      {
        path: ':id',
        loadChildren: () => import('../user.module').then(m => m.UserPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmigosPageRoutingModule {}
