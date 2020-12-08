import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetusernamePage } from './setusername.page';

const routes: Routes = [
  {
    path: '',
    component: SetusernamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetusernamePageRoutingModule {}
