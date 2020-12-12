import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarcuentaPage } from './recuperarcuenta.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarcuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarcuentaPageRoutingModule {}
