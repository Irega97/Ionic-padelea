import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTorneoPage } from './new-torneo.page';

const routes: Routes = [
  {
    path: '',
    component: NewTorneoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTorneoPageRoutingModule {}
