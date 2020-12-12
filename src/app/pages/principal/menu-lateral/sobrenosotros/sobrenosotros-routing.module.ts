import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SobrenosotrosPage } from './sobrenosotros.page';

const routes: Routes = [
  {
    path: '',
    component: SobrenosotrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SobrenosotrosPageRoutingModule {}
