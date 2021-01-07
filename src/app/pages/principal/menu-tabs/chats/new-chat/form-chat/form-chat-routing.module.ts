import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormChatPage } from './form-chat.page';

const routes: Routes = [
  {
    path: '',
    component: FormChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormChatPageRoutingModule {}
