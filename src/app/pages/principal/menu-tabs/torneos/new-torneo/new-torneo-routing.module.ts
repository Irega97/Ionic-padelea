import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTorneoPage } from '../new-torneo/new-torneo.page';

const routes: Routes = [
  {
    path: '',
    component: NewTorneoPage
  },  {
    path: 'pickup-location',
    loadChildren: () => import('./pickup-location/pickup-location.module').then( m => m.PickupLocationPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTorneoPageRoutingModule {}
