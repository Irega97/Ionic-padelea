import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewChatPage } from './new-chat.page';

const routes: Routes = [
  {
    path: '',
    component: NewChatPage
  },
  {
    path: 'form',
    loadChildren: () => import('./form-chat/form-chat.module').then( m => m.FormChatPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewChatPageRoutingModule {}
