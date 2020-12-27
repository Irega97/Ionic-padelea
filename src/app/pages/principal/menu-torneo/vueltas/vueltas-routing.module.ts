import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VueltasPage } from './vueltas.page';

const routes: Routes = [
  {
    path: '',
    component: VueltasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VueltasPageRoutingModule {}
