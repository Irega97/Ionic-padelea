import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscadorPage } from './buscador.page';

const routes: Routes = [
  {
    path: '',
    component: BuscadorPage
  },
  {
    path: 'user',
    children: [
      {
        path: ':id',
        loadChildren: () => import('./user/user.module').then(m => m.UserPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorPageRoutingModule {}
