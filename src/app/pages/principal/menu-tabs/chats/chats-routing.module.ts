import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chats.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  },
  {
    path: 'new',
    loadChildren: () => import('./new-chat/new-chat.module').then( m => m.NewChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
