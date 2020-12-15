import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTorneoPage } from './admin-torneo.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTorneoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTorneoPageRoutingModule {}
