import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdperfilPage } from './updperfil.page';

const routes: Routes = [
  {
    path: '',
    component: UpdperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdperfilPageRoutingModule {}
